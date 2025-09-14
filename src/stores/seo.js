import { defineStore } from 'pinia'

export const useSeoStore = defineStore('seo', {
  state: () => ({
    posts: [
      {
        id: 1,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'SEO初學者教學，搞懂SEO讓你網站訂單接不完',
        excerpt:'從零開始學SEO，掌握基礎觀念與實作技巧，讓網站流量暴增，訂單源源不絕。',
        cover:'https://www.da-vinci.com.tw/uploads/images/20275395a4d4726b38f9daafa67ffce7.jpg',
      },
      {
        id: 2,
        category: 'MyFeCraft',
        date: '2025/07/11',
        title: '新手必讀的 SEO 優化完整指南',
        excerpt:'完整的SEO優化教學，帶你從入門到進階，快速提升網站曝光率與搜尋排名。',
        cover: 'https://www.e-show.tw/includes/timthumb/timthumb.php?src=upload/cht/81/120_img_1.jpg&w=975&zc=0',
      },
      {
        id: 3,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'GEO 與 SEO 的差異：地理行銷與搜尋曝光如何搭配？',
        excerpt: 'GEO 著重位置與即時情境推播，SEO 聚焦搜尋意圖與長期自然流量。搞懂兩者分工，讓在地生意與全站流量一起成長。',
        cover: 'https://www.readyartwork.com/wp-content/uploads/2025/06/GEO-vs-SEO.jpg'
      },
      {
        id: 4,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'On-Page SEO 應做清單：Title、H 標、內文與內部連結',
        excerpt: '逐項檢查頁面元素與文字結構，讓每一頁都能準確對應搜尋者需求並提升點擊率。',
        cover: 'https://plusx.com.tw/wp-content/uploads/2025/06/%E7%B6%B2%E7%AB%99%E5%81%A5%E5%BA%B7%E6%AA%A2%E6%9F%A5-1024x768.png'
      },
      {
        id: 5,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'E-E-A-T 實作手冊：經驗、專家性與信任度如何展現',
        excerpt: '從作者頁、案例研究到參考資料與評價，系統化強化網站的專業與可信度訊號。',
        cover: 'https://seo.whoops.com.tw/wp-content/uploads/2025/04/what-is-eeat-explanation.png'
      },
      {
        id: 6,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'Core Web Vitals 優化指南：LCP、CLS、INP 全面提升',
        excerpt: '掌握關鍵效能瓶頸與實作細節，改善載入速度、互動延遲與版面位移，提升整體體驗與排名機會。',
        cover: 'https://seo.whoops.com.tw/wp-content/uploads/2025/03/what-is-core-web-vitals-key-metrics-illustrated-pencil.png'
      },
      {
        id: 7,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: '結構化資料與豐富結果：Article、FAQ、Breadcrumb 標記',
        excerpt: '用結構化資料幫搜尋引擎讀懂頁面意圖，增加出現精選摘要與豐富結果的機會。',
        cover: 'https://iweb.com.tw/wp-content/uploads/2025/05/%E5%A6%82%E4%BD%95%E5%88%A9%E7%94%A8%E7%B5%90%E6%A7%8B%E5%8C%96%E6%95%B8%E6%93%9A-Schema-Markup-%E5%BC%B7%E5%8C%96-SEO%EF%BC%9F-1920-x-800-%E5%83%8F%E7%B4%A0.jpg'
      },
      {
        id: 8,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'GA4 與 Search Console：量化你的 SEO 成效',
        excerpt: '串接 GA4 與 GSC，從查詢字詞、平均排序到轉換率，建立迭代優化的量化儀表板。',
        cover: 'https://www.eg-creative.com/wp-content/uploads/2023/05/Google-Search-Console.webp'
      },
      {
        id: 9,
        category: 'MyFeCraft',
        date: '2025/07/15',
        title: 'SEO 常見錯誤與黑帽風險：安全邊界與稽核',
        excerpt: '避免關鍵字堆疊、買連結與隱藏文字等高風險手法，建立週期性 SEO 稽核流程。',
        cover: 'https://adbest.com.tw/wp-content/uploads/2024/09/There-are-8-types-of-black-hat-SEO-risks-the-most-serious-ones-will-cause-website-content-to-be-deleted-If-you-get-caught-do-this.jpg'
      }
    ],
  }),
  getters: {
    all: (s) => s.posts,
    byId: (s) => (id) => s.posts.find((p) => String(p.id) === String(id)),
  },
  actions: {
    setPosts(list) {
      this.posts = Array.isArray(list) ? list : []
    },
  },
})
