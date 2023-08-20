export function formatDate (date: string) {
  if (!date) return ''

  const time = new Date(date).getTime()
  return new Intl.DateTimeFormat('en-US').format(time)
}

export function formatDateTime (dateTime: string) {
  if (!dateTime) return ''

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Asia/Taipei',
  }

  const time = new Date(dateTime).getTime()
  return new Intl.DateTimeFormat('en-US', options).format(time)
}

export function paletter (palette: string[], factor: number, opacity: number = 1): string[] {
  const adjustedPalette = palette.map(color => {
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)

      const adjustedR = Math.max(0, Math.min(255, r + factor))
      const adjustedG = Math.max(0, Math.min(255, g + factor))
      const adjustedB = Math.max(0, Math.min(255, b + factor))

      // const adjustedColor = `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`
      return `rgba(${adjustedR},${adjustedG},${adjustedB},${opacity})`
  })

  return adjustedPalette
}
