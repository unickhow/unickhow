import { useMagicKeys, whenever } from '@vueuse/core'

// === init speech recognition
;(window as any).SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new (window as any).SpeechRecognition()
recognition.interimResults = true
// recognition.continuous = true
recognition.lang = 'en-US'
// ===

const keys = useMagicKeys()
const result = ref('')

export const useMagicVocal = () => {
  function recording () {
    recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('')

      console.log('🚀 ~ file: magicVocal.ts ~ line 22 ~ recognition.addEventListener ~ transcript', transcript)
      result.value = transcript
    })
    recognition.addEventListener('end', recognition.start)

    whenever(keys.Ctrl_meta_v, () => {
      console.log('ctrl_meta_v')
      recognition.start()
    })
  }

  return {
    result,
    recording
  }
}