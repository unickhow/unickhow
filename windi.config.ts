import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        pale: 'var(--c__white)',
        dark: 'var(--c__dark)',
        gray: 'var(--c__grey)',
        blue: 'var(--c__blue)',
        red: 'var(--c__red)',
        green: 'var(--c__green)',
        yellow: 'var(--c__yellow)'
      }
    }
  },
  shortcuts: {
    'font-fira': {
      'font-family': '"Fira Code", "monospace", "Zen Maru Gothic", "sans-serif"'
    }
  }
})
