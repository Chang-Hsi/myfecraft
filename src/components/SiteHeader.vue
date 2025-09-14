<!-- src/components/SiteHeader.vue -->
<template>
  <!-- 站點頂部導覽列 -->
  <header class="sticky top-0 z-[1000] bg-white/80 backdrop-blur">
    <nav class="mx-auto flex items-center px-32 py-3">
      <!-- Logo / Title -->
      <router-link to="/" class="flex items-center gap-2 font-bold">
        <span class="h-20 w-20">
          <img src="../assets/img/logo.png" alt="logo" />
        </span>
        <!-- 調整：≤1248 隱藏品牌文字 -->
        <span class="text-3xl font-extrabold max-[1248px]:hidden">MyFeCraft</span>
      </router-link>

      <!-- 導覽列：≥1249 才顯示（避免擠壓/換行） -->
      <ul
        class="flex-1 items-center justify-end gap-10 text-[18px] text-gray-800 min-[1249px]:flex max-[1248px]:hidden"
      >
        <li>
          <router-link to="/about" class="hover:text-gray-900">關於我們</router-link>
        </li>
        <li>
          <router-link
            to="/works"
            class="relative flex items-center gap-2 hover:text-gray-900"
          >
            網頁設計作品
            <span
              class="rounded-md bg-[#C8152A] px-1.5 py-0.5 text-[18px] leading-none text-white"
              >417</span
            >
          </router-link>
        </li>
        <li>
          <router-link to="/plans" class="hover:text-gray-900">方案說明</router-link>
        </li>
        <li>
          <router-link to="/articles" class="hover:text-gray-900"
            >網頁設計專欄</router-link
          >
        </li>
        <li>
          <router-link to="/seo" class="hover:text-gray-900">SEO策略指南</router-link>
        </li>
        <li>
          <!-- 線上諮詢觸發鈕（保留原功能） -->
          <button
            ref="consultBtnRef"
            @click="openConsult"
            class="hover:text-gray-900 focus:outline-none"
          >
            線上諮詢
          </button>
        </li>
      </ul>

      <!-- 漢堡鈕：≤1248 顯示為玫瑰紅底＋白線；點擊側欄選單 -->
      <button
        class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md lg:ml-6 max-[1248px]:bg-rose-700 max-[1248px]:text-white max-[1248px]:hover:bg-rose-700 min-[1249px]:hover:bg-gray-100"
        aria-label="打開選單"
        @click="openMenu"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </nav>
  </header>

  <!-- ====== 你的既有「聯絡面板」保留不動 ====== -->
  <teleport to="body">
    <div
      class="reveal-mask"
      :class="{ open: isOpen }"
      :style="maskVars"
      v-show="isMounted"
      aria-hidden="false"
    >
      <!-- 右上角 X（唯一關閉方式） -->
      <button
        class="fixed right-48 top-9 z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-black/70 bg-transparent text-black hover:scale-105 transition"
        aria-label="關閉"
        @click="closeConsult"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- 內容容器：左右兩欄 -->
      <div class="mx-auto w-full max-w-6xl px-6 py-12 md:py-16 my-auto">
        <div class="grid gap-12 md:grid-cols-2 md:gap-14">
          <!-- 左欄：大標 & 說明 & 聯絡方式 -->
          <div class="mt-60">
            <div
              class="mb-6 inline-block rounded-md bg-black text-white px-3 py-1 text-sm tracking-widest"
            >
              CONTACT
            </div>

            <h1 class="mb-6 text-[46px] leading-[0.95] font-extrabold md:text-[86px]">
              LET'S WORK<br />TOGETHER
            </h1>

            <div class="flex gap-16">
              <div>
                <div class="mb-1 text-3xl font-extrabold">聯絡我們</div>
                <a
                  href="tel:+442891462888"
                  class="text-xl underline font-extrabold text-black hover:opacity-80"
                  >(+886)972800800</a
                >
              </div>
              <div>
                <div class="text-3xl mb-1 font-extrabold">寄送郵件</div>
                <a
                  href="mailto:hello@myfecraft.com"
                  class="text-xl underline text-black font-extrabold hover:opacity-80"
                  >hello@myfecraft.com</a
                >
              </div>
            </div>

            <!-- 社群 -->
            <div class="mt-8 flex items-center gap-4">
              <a href="#" class="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" class="h-16 w-16" fill="currentColor">
                  <path
                    d="M13 22v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3V1h-3a5 5 0 0 0-5 5v3H6v4h3v9h4z"
                  />
                </svg>
              </a>
              <a href="#" class="social-btn" aria-label="X">
                <svg viewBox="0 0 24 24" class="h-16 w-16" fill="currentColor">
                  <path
                    d="M18 2H6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4ZM7.7 6.9h2.2l2.3 3 2.5-3h1.9l-3.4 4 3.9 5.2h-2.2l-2.7-3.6-3 3.6H7.2l3.8-4.5-3.3-4.7Z"
                  />
                </svg>
              </a>
              <a href="#" class="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" class="h-16 w-16" fill="currentColor">
                  <path
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.75 6a.75.75 0 1 1-.75.75A.75.75 0 0 1 17.75 6Z"
                  />
                </svg>
              </a>
              <a href="#" class="social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" class="h-16 w-16" fill="currentColor">
                  <path
                    d="M6.94 8.5H3.56v11h3.38v-11Zm.18-3.47A1.96 1.96 0 1 1 5.16 3 1.96 1.96 0 0 1 7.12 5.03ZM20.45 13.12c0-3.12-1.67-4.57-3.9-4.57a3.36 3.36 0 0 0-3.05 1.68h-.05V8.5H10.2s.04 1.78 0 11h3.38v-6.15a2.41 2.41 0 0 1 .1-.86 1.85 1.85 0 0 1 1.74-1.24c1.23 0 1.72.94 1.72 2.32V19.5h3.31Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- 右欄：表單 -->
          <div>
            <h3 class="mt-60 mb-4 text-4xl font-extrabold">GET IN TOUCH</h3>
            <form class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  class="w-full rounded-xl border-2 border-black/60 bg-white px-4 py-3 text-base text-black placeholder-gray-500 outline-none focus:border-black"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm">Email Address</label>
                <input
                  type="email"
                  placeholder="you@mail.com"
                  class="w-full rounded-xl border-2 border-black/60 bg-white px-4 py-3 text-base text-black placeholder-gray-500 outline-none focus:border-black"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm">Phone Number (Optional)</label>
                <input
                  type="text"
                  placeholder="+886 900 000 000"
                  class="w-full rounded-xl border-2 border-black/60 bg-white px-4 py-3 text-base text-black placeholder-gray-500 outline-none focus:border-black"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm">How did you hear about us?</label>
                <select
                  class="w-full appearance-none rounded-xl border-2 border-black/60 bg-white px-4 py-3 text-base text-black outline-none focus:border-black"
                >
                  <option>Please Select</option>
                  <option>Google</option>
                  <option>Facebook</option>
                  <option>Friends</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="mb-1 block text-sm">How can we help?</label>
                <textarea
                  rows="7"
                  placeholder="Tell us your project, budget and timeline"
                  class="w-full resize-y rounded-xl border-2 border-black/60 bg-white px-4 py-3 text-base text-black placeholder-gray-500 outline-none focus:border-black"
                />
              </div>
              <div class="pt-2 md:col-span-2">
                <button
                  type="button"
                  class="rounded-full bg-black px-8 py-4 text-white text-lg hover:opacity-90"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>

  <!-- ====== 新增：側邊黑色遮罩選單（≤1248 使用） ====== -->
  <teleport to="body">
    <div
      v-show="menuMounted"
      class="fixed inset-0 z-[2500]"
      :class="menuOpen ? 'pointer-events-auto' : 'pointer-events-none'"
      aria-hidden="false"
    >
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
        :class="menuOpen ? 'opacity-100' : 'opacity-0'"
        @click="closeMenu"
      />
      <aside
        class="absolute right-0 top-0 h-full w-[min(85vw,420px)] bg-black text-white shadow-2xl transition-transform duration-300"
        :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <button
          class="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/50 hover:bg-white/10"
          aria-label="關閉選單"
          @click="closeMenu"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <nav class="mt-14 px-6 py-6">
          <ul class="space-y-4">
            <li>
              <router-link
                to="/about"
                class="flex items-center gap-3 text-white/90 hover:text-white text-2xl"
                @click.native="closeMenu"
                >關於我們</router-link
              >
            </li>
            <li>
              <router-link
                to="/works"
                class="flex items-center gap-3 text-white/90 hover:text-white text-2xl"
                @click.native="closeMenu"
              >
                <span>網頁設計作品</span>
                <span class="rounded bg-rose-700 px-2 py-0.5 text-lg leading-none"
                  >417</span
                >
              </router-link>
            </li>
            <li>
              <router-link
                to="/plans"
                class="flex items-center gap-3 text-white/90 hover:text-white text-2xl"
                @click.native="closeMenu"
                >方案說明</router-link
              >
            </li>
            <li>
              <router-link
                to="/articles"
                class="flex items-center gap-3 text-white/90 hover:text-white text-2xl"
                @click.native="closeMenu"
                >網頁設計專欄</router-link
              >
            </li>
            <li>
              <router-link
                to="/seo"
                class="flex items-center gap-3 text-white/90 hover:text-white text-2xl"
                @click.native="closeMenu"
                >SEO策略指南</router-link
              >
            </li>
            <li>
              <router-link
                to="/contact"
                class="flex items-center gap-3 text-white/90 hover:text-white text-2xl"
                @click.native="closeMenu"
                >線上諮詢</router-link
              >
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const form = ref({
  name: "",
  email: "",
  phone: "",
  source: null,
  message: "",
});
const sources = [
  { label: "Please Select", value: null },
  { label: "Google", value: "google" },
  { label: "Facebook", value: "facebook" },
  { label: "Friends", value: "friends" },
  { label: "Other", value: "other" },
];

const isOpen = ref(false);
const isMounted = ref(false);
const consultBtnRef = ref(null);

const maskVars = ref({
  "--cx": "100%",
  "--cy": "0%",
});

function openConsult() {
  const rect = consultBtnRef.value?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth - 24;
  const cy = rect ? rect.top + rect.height / 2 : 24;
  maskVars.value = { "--cx": `${cx}px`, "--cy": `${cy}px` };
  isOpen.value = true;
  document.documentElement.style.overflow = "hidden";
}
function closeConsult() {
  isOpen.value = false;
  document.documentElement.style.overflow = "";
}

// 依你要求：不支援 ESC 關閉，只能按 X
onMounted(() => {
  isMounted.value = true;
});
onBeforeUnmount(() => {});

/* ===== 新增：側邊選單狀態與行為（≤1248 時使用） ===== */
const menuOpen = ref(false);
const menuMounted = ref(false);

function openMenu() {
  // 直接開，不限制寬度（樣式已在 ≤1248 突出漢堡）
  menuMounted.value = true;
  menuOpen.value = true;
  document.documentElement.style.overflow = "hidden";
}
function closeMenu() {
  menuOpen.value = false;
  document.documentElement.style.overflow = "";
  setTimeout(() => (menuMounted.value = false), 220);
}
</script>

<style scoped>
/* ===== 圓形擴散覆蓋層（背景 & 動畫） ===== */
.reveal-mask {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: #d05353;
  clip-path: circle(0px at var(--cx) var(--cy));
  transition: clip-path 800ms cubic-bezier(0.22, 0.61, 0.36, 1);
  pointer-events: auto;
  overflow-y: auto;
}
.reveal-mask.open {
  clip-path: circle(150vmax at var(--cx) var(--cy));
}

/* 大標字重更像範例 */
h1 {
  letter-spacing: 0.5px;
}
</style>
