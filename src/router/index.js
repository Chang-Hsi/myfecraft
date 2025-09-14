// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Works from '@/views/Works.vue'
import Articles from '@/views/Articles.vue'
import Seo from '@/views/Seo.vue'
import SeoDetail from '@/views/SeoDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: Home, meta: { title: '首頁' } },
        { path: 'about', name: 'about', component: About, meta: { title: '關於我' } },
        { path: 'works', name: 'works', component: Works, meta: { title: '作品' } },
        { path: 'articles', name: 'articles', component: Articles, meta: { title: '文章' } },
        { path: 'seo', name: 'seo', component: Seo, meta: { title: 'SEO' } },
        { path: 'seo/:id', name: 'seo-detail', component: SeoDetail, meta: { title: 'SEO 文章' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

// 已移除：router.beforeEach 設定 document.title，改由 useHead 處理
export default router
