export function formatDateTime (dateTime: string) {
  if (!dateTime) return ''
  const time = new Date(dateTime).getTime()
  return new Intl.DateTimeFormat('en-US').format(time)
}
