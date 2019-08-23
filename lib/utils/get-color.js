export const colorTypes = [
  'secondary',
  'warning',
  'success',
  'default',
  'alert',
  'error'
]

const getColor = (type, modifier) => {
  switch (type) {
    case 'secondary':
      return `var(--geist-secondary${modifier ? `-${modifier}` : ''})`
    case 'warning':
      return `var(--geist-warning${modifier ? `-${modifier}` : ''})`
    case 'error':
      return `var(--geist-error${modifier ? `-${modifier}` : ''})`
    case 'success':
      return `var(--geist-success${modifier ? `-${modifier}` : ''})`
    case 'default':
      return `var(--geist-foreground${modifier ? `-${modifier}` : ''})`
    case 'alert':
      return 'var(--geist-alert)'
    default:
      return null
  }
}

export default getColor
