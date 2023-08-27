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
      black: 'var(--c__black)',
      pale: 'var(--c__white)',
      dark: 'var(--c__dark)',
      gray: 'var(--c__grey)',
      grey: 'var(--c__grey)',
      blue: 'var(--c__blue)',
      red: 'var(--c__red)',
      green: 'var(--c__green)',
      orange: 'var(--c__orange)',
      'orange-lighter': 'var(--c__orange-lighter)',
      primary: 'var(--c__primary)',
      secondary: 'var(--c__secondary)',
      matrix: '#00ff41'
    }
  },
  shortcuts: {
    'tc-content-text': 'text-dark dark:text-pale',
    'tc-content-note': 'text-gray dark:text-gray',
    'animation-glitch': 'animation-name-[glitch] animation-duration-5s animation-iteration-count-infinite',
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
    ['font-press', {
      'font-family': '"Press Start 2P", "monospace", "Zen Maru Gothic", "sans-serif"'
    }],
    ['theme__cloud-color', {
      'color': 'var(--c__cloud)'
    }]
  ]
})
