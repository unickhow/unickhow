import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import fs from 'fs-extra'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'

import Shiki from 'markdown-it-shiki'
import anchor from 'markdown-it-anchor'
import slugify from '@sindresorhus/slugify'
import LinkAttributes from 'markdown-it-link-attributes'
import TOC from 'markdown-it-table-of-contents'
import ImplicitFigures from 'markdown-it-image-figures'
import matter from 'gray-matter'

import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    WindiCSS(),
    Icons({ compiler: 'vue3' }),
    AutoImport({
      imports: [
        // presets
        'vue'
      ]
    }),
    Markdown({
      wrapperComponent: route => /\/posts\/.*\.md$/.test(route) ? 'PostProvider' : undefined,
      wrapperClasses: 'blog-md-container',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(md) {
        md.use(anchor, {
          permalink: anchor.permalink.headerLink(),
          slugify: (s: string) => slugify(s)
        })
        md.use(Shiki, {
          highlightLines: true,
          theme: 'one-dark-pro'
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener",
          }
        })
        md.use(TOC, {
          includeLevel: [2, 3]
        })
        md.use(ImplicitFigures, {
          dataType: true,
          figcaption: 'alt'
        })
      }
    }),
    Pages({
      extensions: ['vue', 'md'],
      extendRoute (route) {
        const filePath = path.resolve(__dirname, route.component.slice(1))

        if (/\/posts\/.*\.md$/.test(filePath)) {
          const md = fs.readFileSync(filePath, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      }
    })
  ],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`
    },
  }
})
