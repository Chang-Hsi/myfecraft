<!-- src/components/seo/SeoArticle.vue -->
<template>
  <section class="w-full bg-white">
    <div
      class="mx-auto max-w-6xl px-4 py-8 md:py-10 md:grid md:grid-cols-[260px,1fr] md:gap-10"
    >
      <!-- 文章本體 -->
      <article class="max-w-none bg-white">
        <!-- 頂部資訊 -->
        <div v-motion-fade-visible-once :duration="450" class="mb-6">
          <div class="mb-3 flex items-center gap-2 text-2xl text-gray-500">
            <span class="inline-flex items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M16 2v3M8 2v3M3 9h18M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ post?.date }}
            </span>
          </div>
          <h1 class="mb-4 text-2xl font-bold leading-snug text-gray-900 md:text-xl">
            {{ post?.title }}
          </h1>
          <hr class="my-6 border-gray-200" />
          <div v-if="post?.cover" class="mb-6 overflow-hidden rounded-xl">
            <img :src="post.cover" :alt="post.title" class="w-full object-cover" />
          </div>
          <p v-if="post?.excerpt" class="mb-8 text-gray-700 md:text-xl md:leading-8">
            {{ post.excerpt }}
          </p>
        </div>

        <!-- 目錄 -->
        <aside v-if="toc.length" class="mb-8 md:mb-0">
          <!-- 漸層背景卡片 -->
          <div
            class="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white shadow-lg ring-1 ring-white/15"
          >
            <h4
              class="mb-3 text-center text-3xl font-semibold tracking-widest text-white/90"
            >
              目錄
            </h4>

            <nav class="space-y-1">
              <button
                v-for="(t, i) in toc"
                :key="t.id + i"
                @click="scrollToId(t.id)"
                class="block w-full text-left rounded-lg px-3 py-2 text-xl transition"
                :class="[
                  // 目前章節：半透明白底 + 細框
                  activeId === t.id
                    ? 'bg-white/20 ring-1 ring-white/20 text-white'
                    : // 一般狀態：白字，滑過有淡白底
                      'text-white/90 hover:bg-white/10',
                  // H3 縮排
                  t.level === 3 ? 'ml-4' : '',
                ]"
              >
                {{ t.text }}
              </button>
            </nav>
          </div>
        </aside>

        <!-- 文章內容（從 html 檔載入） -->
        <div
          ref="articleRef"
          class="prose max-w-none prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:underline"
          v-html="html"
        />
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useSeoStore } from "@/stores/seo"; // 你前面建立的 Pinia store

const route = useRoute();
const store = useSeoStore();

/* 1) 文章 meta 從 pinia 拿（title/date/excerpt/cover） */
const post = computed(() => store.byId(route.params.id));

/* 2) 文章 html 內容從 src/content/seo/*.html 動態載入 */
const rawFiles = import.meta.glob("@/content/seo/*.html", { as: "raw", eager: true });
function getHtmlById(id) {
  // 找到對應路徑的內容：檔名為 1.html、2.html...
  const entry = Object.entries(rawFiles).find(([path]) => path.endsWith(`/${id}.html`));
  return entry ? entry[1] : '<p class="text-gray-500">找不到這篇文章內容。</p>';
}

const html = ref(getHtmlById(route.params.id));

watch(
  () => route.params.id,
  async (id) => {
    html.value = getHtmlById(id);
    await nextTick();
    buildTOC(); // 文章切換時重建目錄
  },
  { immediate: true }
);

/* 3) 目錄（掃描 h2/h3） + 進場淡入（用 IntersectionObserver 加 class） */
const articleRef = ref(null);
const toc = ref([]); // [{id,text,level}]
const activeId = ref("");
let io = null;

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function buildTOC() {
  await nextTick();
  const root = articleRef.value;
  if (!root) return;

  const headings = root.querySelectorAll("h2, h3");
  toc.value = [];
  headings.forEach((h) => {
    const id = h.id || slugify(h.textContent || "");
    h.id = id;
    toc.value.push({ id, text: h.textContent || "", level: h.tagName === "H3" ? 3 : 2 });
    h.classList.add("reveal"); // 初始狀態
  });

  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          entry.target.classList.add("is-show"); // 觸發淡入
          activeId.value = id;
        }
      });
    },
    { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0.01 }
  );
  headings.forEach((h) => io.observe(h));

  // 讓文中的圖片有 hover zoom-in
  root.querySelectorAll("img").forEach((img) => {
    img.classList.add("hover-zoom-target");
  });
}

onMounted(buildTOC);
onBeforeUnmount(() => io && io.disconnect());
</script>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

/* 標題進場 */
.reveal {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 420ms ease, transform 420ms ease;
}
.reveal.is-show {
  opacity: 1;
  transform: translateY(0);
}

/* 內文圖片 hover 放大 */
.hover-zoom-target {
  transition: transform 600ms ease;
}
.hover-zoom-target:hover {
  transform: scale(1.06);
}
</style>
