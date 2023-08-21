import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    dictionary: {
      type: String,
      default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321!@#$%&~*+?'
    },
    text: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    fixedHeadCount: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 50 // ms
    },
    flipDuration: {
      type: Number,
      default: 2 // bigger is longer, no unit
    },
    tag: {
      type: String,
      default: 'p'
    },
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  data () {
    return {
      title: '',
      originTitle: '',
      loop: 0,
      interval: null
    } as {
      title: string
      originTitle: string
      loop: number
      interval: NodeJS.Timeout | null
    }
  },
  mounted () {
    this.title = this.originTitle = this.text
    this.loop = this.fixedHeadCount + 1
  },
  methods: {
    flip () {
      if (this.interval) clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.title = this.title
          .split('')
          .map((_, index) => {
            if (index < this.loop) {
              return this.originTitle[index]
            }
            return this.dictionary[
              Math.floor(Math.random() * this.dictionary.length)
            ]
          })
          .join('')
        this.loop += 1 / this.flipDuration
        if (this.loop >= this.originTitle.length) {
          clearInterval(this.interval as NodeJS.Timeout)
          this.loop = this.fixedHeadCount
        }
      }, this.speed)
    }
  },
  render () {
    return h(
      this.tag,
      {
        onMouseover: this.trigger === 'hover' ? this.flip : null
      },
      this.title
    )
  }
})
