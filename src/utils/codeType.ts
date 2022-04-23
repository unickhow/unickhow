import { whenever, useMagicKeys } from '@vueuse/core'

export const useCodeType = () => {
  const isCodeMatched = ref(false)
  let keydownEvt: any

  onMounted(() => {
    //* Todo: use Rxjs
    const secretWord = 'ls'
    const inputKeys = ref('')

    keydownEvt = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 's') {
        inputKeys.value += e.key
      } else {
        inputKeys.value = ''
      }
    }
    document.addEventListener('keydown', keydownEvt)

    const isLs = () => {
      return inputKeys.value === secretWord
    }
    whenever(isLs, () => isCodeMatched.value = true)

    const { escape } = useMagicKeys()
    whenever(escape, () => isCodeMatched.value = false)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', keydownEvt)
  })

  return { isCodeMatched }
}