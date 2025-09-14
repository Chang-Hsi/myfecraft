<template>
  <div class="flex flex-col items-center justify-center gap-6 py-14 md:py-40">
    <motion.h1
      :initial="{ y: 20, opacity: 0 }"
      :while-in-view="{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          scale: { type: 'spring', visualDuration: 0.8, bounce: 0.5 },
        },
      }"
      :whileHover="{ scale: 1.03, transition: { duration: 0.5 } }"
      :in-view-options="{ margin: '50px 0px -50px 0px' }"
      class="cursor-default text-center text-4xl font-bold tracking-widest md:text-6xl"
    >
      <span>案件結案後，我們的服務</span><span class="text-rose-700">才真正開始</span>
      <div class="text-2xl py-8 text-gray-500">
        不只交付專案，我們持續追蹤網站運作並提供改進建議，讓您的投資長期發揮最大價值。
      </div>
    </motion.h1>

    <!-- 單欄直排容器（每筆＝一整行） -->
    <div class="mx-auto w-[min(1100px,90vw)] space-y-16">
      <motion.div
        v-for="(item, index) in serviceList"
        :key="index"
        :initial="getItemAnimation(index).initial"
        :while-in-view="getItemAnimation(index).whileInView"
        :in-view-options="getItemAnimation(index).inViewOptions"
        class="w-full"
      >
        <!-- 偶數：左圖右文；奇數：右圖左文 -->
        <div
          :class="[
            index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
            'flex flex-col gap-6 md:gap-10',
          ]"
        >
          <img
            :src="item.image"
            alt="服務圖片"
            class="w-full rounded-xl object-cover opacity-90 shadow-xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl lg:w-1/2"
          />
          <div
            :class="[
              'text flex w-full flex-col justify-center gap-3 md:gap-4 lg:w-1/2',
              index % 2 !== 0 ? 'lg:items-end' : '',
            ]"
          >
            <div
              :class="['flex gap-2 md:flex-col', index % 2 !== 0 ? 'lg:items-end' : '']"
            >
              <h2 class="text-2xl font-bold tracking-widest text-rose-700 md:text-8xl">
                0{{ index + 1 }}
              </h2>
              <h2 class="text-2xl font-bold tracking-widest md:text-4xl">
                {{ item.title }}
              </h2>
            </div>
            <p class="px-2 text-base leading-7 text-gray-700 md:text-xl md:leading-8">
              {{ item.content }}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</template>

<script setup>
import { motion } from "motion-v";

// 動畫方向：偶數由右進、奇數由左進
const getItemAnimation = (index) => ({
  initial: { x: index % 2 === 0 ? 50 : -50, opacity: 0 },
  whileInView: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      scale: { type: "spring", visualDuration: 1, bounce: 0.5 },
      delay: 0.2,
    },
  },
  inViewOptions: { margin: "100px 0px -100px 0px" },
});

const serviceList = [
  {
    title: "網站上線不用怕，專人後台教學",
    image: "https://image.woshipm.com/wp-files/2021/09/llI009l90OrxWr3n87pa.jpg",
    content:
      "由專人親自帶您講解後台介面，讓負責網站的窗口不用孤軍奮戰。直覺的後台介面設計，讓教學流程輕鬆且簡單易懂，客戶的回饋，都是我們優化使用者體驗的美好經驗。",
  },
  {
    title: "雲端系統建置與維運",
    image:
      "https://www.technice.com.tw/wp-content/uploads/2024/05/Cloud-Engineer-1024x517.jpg",
    content:
      "雲端對你來說或許複雜，但對我們來說，已是每天的日常。我們熟悉 GCP、AWS、Azure 及自建環境，能協助你規劃架構、部署節費、優化微服務。從 VM 到容器化，我們幫你找出最適合的組合，讓系統穩定又好管。",
  },
  {
    title: "SSL憑證申請",
    image: "https://www.faishi.com/wp-content/uploads/2025/02/ssl-01-1024x614.jpg",
    content:
      "我們同時提供免費與付費的 SSL 憑證申請與安裝服務，無論是單一網域還是多網域，專業團隊會全程協助，確保憑證配置正確運作，提升網站安全性與信任感。也能根據您的需求與預算，靈活選擇合適的安全方案，為網站打造全面的數據保護。",
  },
  {
    title: "客戶專屬SEO網站優化",
    image:
      "https://www.arno.tw/wp-content/uploads/2023/08/seo-website-structure-schema.jpg",
    content:
      "在網站排名的這條路上，與更專業的夥伴同行，我們將能提供客戶搜尋引擎SEO關鍵字優化建議、報價以及效果評估，先了解那些關鍵字有使用意義，再針對關鍵字做排名強化，陪您一起做有效的SEO。",
  },
  {
    title: "其他語系網站也OK",
    image:
      "https://www.xnbeast.com/wp-content/uploads/2022/03/%E5%A4%9A%E8%AF%AD%E8%A8%80%E7%BD%91%E7%AB%99-768x512.png",
    content:
      "我們與專業的翻譯公司配合，在模組基本功能相關翻譯都能提供服務，歡迎將您的需求告訴我們，新視野會依照語系製作難易度報價，並提供您製作上的注意事項。(例如阿拉伯文為左右顛倒，價格會較高，簡體中文若有繁體中文版，價格會較低)。",
  },
  {
    title: "技術人員派遣",
    image: "https://x.webdo.cc/userfiles/OKJOBadmin/image/team_img04.jpg",
    content:
      "當團隊需要即戰力時，我們就是你的後援。我們提供經驗豐富的工程師支援服務，依需求快速進駐、協同開發。不僅技術紮實，更重視團隊協作與流程遵守，確保每一次支援都是可靠加分的力量。",
  },
];
</script>
