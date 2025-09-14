<template>
  <section class="relative min-h-[70vh] px-40 py-10 max-[1400px]:hidden">
    <div
      class="relative mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white/70 backdrop-blur"
    >
      <div class="flex items-stretch">
        <div class="relative h-[70vh] w-[25%] shrink-0">
          <img
            :src="contactBg"
            alt="聯絡我們背景"
            class="absolute inset-0 w-full h-full object-cover brightness-95"
          />
          <div class="absolute inset-0 bg-white/10"></div>
        </div>

        <div class="w-[100%] p-20 pl-84 bg-white/90">
          <div class="mb-6">
            <h2 class="text-4xl font-bold text-gray-900">
              請填寫您的資料，我們將儘快與您聯繫！
              <span class="text-lg text-rose-600">◆ 為必填</span>
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="flex flex-wrap gap-5">
              <div class="w-1/2">
                <label class="block text-gray-700 font-medium mb-1">◆ 姓名</label>
                <div class="flex gap-3">
                  <InputText
                    v-model="form.name"
                    placeholder="請輸入姓名"
                    class="flex-1"
                  />
                  <div class="flex items-center gap-4 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                      <RadioButton
                        inputId="gender-m"
                        name="gender"
                        value="先生"
                        v-model="form.gender"
                      />
                      <label for="gender-m">先生</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton
                        inputId="gender-f"
                        name="gender"
                        value="女士"
                        v-model="form.gender"
                      />
                      <label for="gender-f">女士</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-1/2">
                <label class="block text-gray-700 font-medium mb-1">◆ 連絡電話</label>
                <InputText
                  v-model="form.phone"
                  placeholder="EX：0911-123123　or　04-23750045"
                  class="w-full"
                />
              </div>

              <div class="w-full">
                <label class="block text-gray-700 font-medium mb-1">聯絡信箱</label>
                <InputText
                  v-model="form.email"
                  placeholder="請輸入 E-MAIL"
                  class="w-full"
                />
              </div>

              <div class="w-full">
                <label class="block text-gray-700 font-medium mb-1">公司名稱</label>
                <InputText
                  v-model="form.company"
                  placeholder="請輸入公司名稱"
                  class="w-full"
                />
              </div>

              <div class="w-full">
                <label class="block text-gray-700 font-medium mb-2">想詢問的方案</label>
                <div class="flex flex-wrap gap-x-10 gap-y-2">
                  <div class="flex items-center gap-2">
                    <RadioButton
                      inputId="plan-1"
                      name="plan"
                      value="8800超值方案"
                      v-model="form.plan"
                    />
                    <label for="plan-1">8800超值方案</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <RadioButton
                      inputId="plan-2"
                      name="plan"
                      value="模組購物車方案"
                      v-model="form.plan"
                    />
                    <label for="plan-2">模組購物車方案</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <RadioButton
                      inputId="plan-3"
                      name="plan"
                      value="半客製形象網站方案"
                      v-model="form.plan"
                    />
                    <label for="plan-3">半客製形象網站方案</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <RadioButton
                      inputId="plan-4"
                      name="plan"
                      value="客製化網站專案"
                      v-model="form.plan"
                    />
                    <label for="plan-4">客製化網站專案</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-2">
              <Button
                type="submit"
                label="送出詢價"
                severity="danger"
                rounded
                size="large"
                class="!px-8 !py-5 text-base font-semibold"
              />
            </div>
          </form>
        </div>
      </div>

      <div class="pointer-events-none absolute inset-0 flex items-center">
        <div class="w-full px-6">
          <div class="relative max-w-6xl mx-auto">
            <div class="absolute -translate-y-[300px] -translate-x-[55px]">
              <Motion
                :initial="{ y: 25, opacity: 0 }"
                :while-in-view="{
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.8, easing: 'ease-out' },
                }"
                :while-hover="{ scale: 1.03, transition: { duration: 0.5 } }"
                :in-view-options="{ margin: '50px 0px -50px 0px' }"
              >
                <h1
                  class="cursor-default font-extrabold leading-none tracking-tight text-black drop-shadow-sm text-[clamp(34px,7vw,72px)]"
                >
                  CONTACT <span class="text-red-600">US</span>
                </h1>
              </Motion>
            </div>

            <img
              :src="planeImg"
              alt="紙飛機"
              class="absolute top-1/2 left-1/2 -translate-x-[585px] -translate-y-[-56px] w-64 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 說明：使用 Tailwind 任意媒體查詢 max-[1400px]:hidden
// 只要視窗寬度 ≤ 1400px，整個 section 會被隱藏（包含內部所有內容）。

import { reactive } from "vue";
import contactBg from "@/assets/img/Contact.jpg";
import planeImg from "@/assets/img/Bird.png";
import { Motion } from "motion-v";

const form = reactive({
  name: "",
  gender: "先生",
  phone: "",
  email: "",
  company: "",
  plan: "",
});

const handleSubmit = () => {
  if (!form.name || !form.phone) {
    return;
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  img[alt="紙飛機"] {
    opacity: 0.9;
  }
}
h1 {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>
