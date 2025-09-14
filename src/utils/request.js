import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'https://api.example.com', // ← 改這裡
  timeout: 15000, // 逾時 15s
})

// 請求攔截器：可在這裡夾帶 token
http.interceptors.request.use(
  (config) => {
    // 例如：從 localStorage 取 token
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 回應攔截器：統一錯誤處理
http.interceptors.response.use(
  (res) => res.data, // 預設直接回傳 data
  (error) => {
    // 這裡可做全域錯誤提示/導向登入等
    console.error('[HTTP ERROR]', error?.response || error)
    return Promise.reject(error)
  }
)

export default http