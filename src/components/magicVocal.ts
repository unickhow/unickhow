import { useMagicKeys, whenever } from '@vueuse/core'
import { CONSTANTS } from '../utils/enums'

// === init speech recognition
let recognition: any
if (typeof window !== 'undefined') {
  ;(window as any).SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  recognition = new (window as any).SpeechRecognition()
  recognition.interimResults = true
  // recognition.continuous = true
  recognition.lang = CONSTANTS.SPEECH_LANG
}
// ===

const keys = useMagicKeys()
const result = ref('')
const isRecording = ref(false)

export const useMagicVocal = () => {
  function init () {
    recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('')

      result.value = transcript
      console.debug('🗣 ', transcript)

      if (transcript.includes(CONSTANTS.KEYWORD_ABORT)) stopRecording()
    })
    recognition.addEventListener('end', continueOnEnd)

    whenever(keys.Ctrl_meta_v, () => {
      console.debug('🎤 My blade is at your service.')
      startRecording()
    })
  }

  function startRecording () {
    if (isRecording.value) return false

    isRecording.value = true
    recognition.start()
  }

  function continueOnEnd () {
    isRecording.value = false
    startRecording()
  }

  function stopRecording () {
    console.debug('🙊 Have a nice day.')
    isRecording.value = false
    recognition.removeEventListener('end', continueOnEnd)
    recognition.stop()
  }

  return {
    result,
    init,
    startRecording,
    stopRecording
  }
}