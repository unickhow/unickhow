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
  };

  const time = new Date(dateTime).getTime()
  return new Intl.DateTimeFormat('en-US', options).format(time)
}
