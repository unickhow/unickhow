import { defineConfig, presetWind } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetWind()
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
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
  },
  rules: [
    ['container', {
      'width': '100%',
      'padding-left': '2rem',
      'padding-right': '2rem'
    }],
    ['font-fira', {
      'font-family': '"Fira Code", "monospace", "Zen Maru Gothic", "sans-serif"'
    }],
    ['font-ntr', {
      'font-family': '"NTR", "sans-serif"'
    }],
    ['theme__text-color', {
      'color': 'var(--text-color)'
    }],
    ['theme__note-color', {
      'color': 'var(--note-color)'
    }],
    ['theme__cloud-color', {
      'color': 'var(--cloud-color)'
    }]
  ]
})
