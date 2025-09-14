<template>
  <div class="flex flex-col items-center gap-6 bg-white pt-20">
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
      class="cursor-default text-4xl text-center font-bold tracking-widest md:text-6xl"
    >
      <span>這些功能·就該</span><span class="text-rose-700">標配</span>
    </motion.h1>

    <div class="w-full mb-12">
      <CardsGallery :items="cards" :speed="30" :pause-on-hover="true" />
    </div>
  </div>
</template>

<script setup>
import { motion } from "motion-v";
import CardsGallery from "./CardsGallery.vue";
const cards = [
  {
    img:
      "https://www.awakening-design.com.tw/upload/blog/thumb_1971ae6b4860123d1f97fc01f200a167.jpg",
    title: "隱私權政策提醒",
    desc:
      "內建彈窗與條款連結自動提醒，流程符合法規，完整告知個資蒐集與使用，強化信任與合規可追溯。",
  },
  {
    img:
      "https://turingcerts.com/wp-content/uploads/2024/06/%E5%9C%96%E9%9D%88%E8%AD%89%E6%9B%B8-4.%E8%B3%87%E5%AE%89-%E9%A6%96%E5%9C%96.png",
    title: "資訊安全部署",
    desc:
      "導入 SSL、WAF、權限分級與備援，分層防護關鍵節點，有效降低入侵風險，守護站內與交易資料。",
  },
  {
    img: "https://www.da-vinci.com.tw/uploads/editor/files/RWD-wedesign-20201109.jpg",
    title: "RWD響應式製作",
    desc:
      "自動因應手機至桌機的版面與圖片尺寸，優化可讀性與載入速度，確保跨裝置呈現一致穩定。",
  },
  {
    img:
      "https://i.ytimg.com/vi/qVaVvesLgus/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLArJofuIOKOOANSLRiqLIw5n93tQA",
    title: "綠界科技金流串接",
    desc:
      "整合信用卡、ATM、超商等付款管道，交易回調即時更新訂單狀態，對帳自動化，降低人工作業。",
  },
  {
    img: "https://des13.com/images/16.jpg",
    title: "上百種 HTML 美編範本",
    desc:
      "收錄百款常用版型與元件樣式，一鍵套用即可成稿，維持設計一致性，快速打造專業內容頁。",
  },
  {
    img: "https://www.esky168.com/datapro/std/images/prom12_img/IMG1B.png",
    title: "POS機與平台的串接",
    desc:
      "門市 POS 與雲端平台雙向同步，庫存、訂單、會員資料即時更新，減少落差與人工校正成本。",
  },
  {
    img: "https://www.yesharris.com/wp-content/uploads/2024/09/seo-ranking-3.png",
    title: "SEO 架構與優化",
    desc:
      "部署結構化資料、強化站內連結與效能，改善抓取與核心網頁指標，提升自然排名與點擊率。",
  },
  {
    img: "https://cdn-yunyin.modao.cc/CMS/blog/mes-1.png",
    title: "後台管理系統設計",
    desc:
      "規劃角色權限與工作流程，結合易用介面與稽核軌跡，提升管理效率、資料準確性與可追蹤性。",
  },
  {
    img: "https://www.wishmobile.com/storage/images/764cd68af201ed2fafff00115c66a137.jpg",
    title: "線上推播通知",
    desc:
      "整合 FCM 推播，支援分眾標籤與排程發送，A/B 測試成效，提升回訪率、互動率與轉換。",
  },
  {
    img:
      "https://storage.googleapis.com/simpos-uploads/strapi/onepager_restaurant_feature_5_c7a3e8d27d/onepager_restaurant_feature_5_c7a3e8d27d.png",
    title: "優惠券與活動促銷功能",
    desc:
      "提供折抵、滿額贈與折扣碼等規則，支援期限與名額控管，結合報表檢視成效，促購更精準。",
  },
  {
    img:
      "https://blog.shopline.tw/wp-content/uploads/2021/12/line-pay-connect-mobile-payment-top-banner.png",
    title: "LINE PAY串接",
    desc:
      "導入 LINE Pay 快速結帳，縮短付款流程與欄位，降低跳出率，打造順暢的行動支付體驗。",
  },
  {
    img:
      "https://www.taishinbank.com.tw/TSB/export/sites/TSB/images/public-relations/20210121_-APP-_2.jpg",
    title: "台新銀行金流串接",
    desc:
      "串接台新金流，支援信用卡及分期交易，交易結果即時回傳，流程符合銀行資安規範與稽核需求。",
  },
];
</script>
