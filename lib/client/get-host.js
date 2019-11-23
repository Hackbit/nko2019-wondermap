// This is not production ready, (except with providers that ensure a secure host, like Now)
// FIXME: For production consider the usage of environment variables and NODE_ENV
export default (req) => {
  if (!req) return ''

  const { host } = req.headers

  if (host.startsWith('localhost')) {
    return `http://${host}`
  }
  return `https://${host}`
}