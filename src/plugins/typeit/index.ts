import { onMounted, nextTick, onUnmounted, ref } from "vue"

export const useTypeIt = (el: string) => {
  let typingInstance: any
  const hasTypingDone = ref(false)

  onMounted(async () => {
    await nextTick()

    const TypeIt = (await import('typeit')).default
    typingInstance = new TypeIt(el, {
      speed: 100,
      startDelay: 2000
    })
    typingInstance
      .type('// will launch very soo')
      .pause(800)
      .delete(8, { speed: 400 })
      .type('in couple da', { speed: 150 })
      .pause(1300)
      .delete(12)
      .pause(1500)
      .delete(7, { speed: 100 })
      .type('go on when somethi')
      .move(-8)
      .delete(4)
      .type('if')
      .move(8)
      .type('ng cross my mind ...')
      .pause(20000)
      .delete(null, { instant: true })
      .type('you just dont', { speed: 100 })
      .delete(1, { speed: 400 })
      .type('\'t')
      .type(' giveup', { speed: 100 })
      .move(-2, { speed: 400 })
      .type(' ')
      .move(2, { speed: 100 })
      .type(' huh?')
      .pause(10000)
      .delete(null, { instant: true })
      .type('share with me if you have any unique idea.')
      .pause(2000)
      .move(-6, { speed: 200 })
      .delete(3)
      .type('ck', {
        speed: 150,
        afterComplete: async () => {
          hasTypingDone.value = true
        }
      })
      .go()
  })

  onUnmounted(() => {
    typingInstance.destroy()
  })

  return { hasTypingDone }
}
