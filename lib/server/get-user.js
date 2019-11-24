import { Token, User } from './db'

export default async (req) => {
  if (!('authorization' in req.headers)) {
    return false
  }

  const auth = await req.headers.authorization

  const { token: tokenValue } = JSON.parse(auth)
  const token = await Token.findOne({ value: tokenValue })
  if (!token) return false

  const user = await User.findById(token.user)
  if (user) {
    return user
  } else {
    return false
  }
}