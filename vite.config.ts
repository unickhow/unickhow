import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Icons({ compiler: 'vue3' }),
    AutoImport({
      imports: [
        // presets
        'vue'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`
    },
  }
})
