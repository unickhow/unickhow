import { useStorage } from '@vueuse/core'

export default function useTheme() {
  const config = useRuntimeConfig()
  const theme = useStorage(config.public.NUXT_THEME_STORE, 'auto')

  return {
    theme,
    isDark: computed(() => theme.value === 'dark'),
    isLight: computed(() => theme.value === 'light'),
    isAuto: computed(() => theme.value === 'auto')
  }
}
