import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        pale: 'var(--c__white)',
        dark: 'var(--c__dark)',
        gray: 'var(--c__grey)',
        grey: 'var(--c__grey)',
        blue: 'var(--c__blue)',
        red: 'var(--c__red)',
        green: 'var(--c__green)',
        orange: 'var(--c__orange)'
      }
    }
  },
  shortcuts: {
    'font-fira': {
      'font-family': '"Fira Code", "monospace", "Zen Maru Gothic", "sans-serif"'
    },
    'theme__text-color': {
      'color': 'var(--text-color)'
    },
    'theme__note-color': {
      'color': 'var(--note-color)'
    },
    'theme__cloud-color': {
      'color': 'var(--cloud-color)'
    }
  },
  plugins: [
    require('windicss/plugin/aspect-ratio')
  ]
})
