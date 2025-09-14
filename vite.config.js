import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      dts: true,
      resolvers: [MotionResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
