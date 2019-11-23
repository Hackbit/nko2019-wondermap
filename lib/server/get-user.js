import { User } from './db'

export default async (req) => {
  if (!('authorization' in req.headers)) {
    return false
  }

  const auth = await req.headers.authorization

  const { token } = JSON.parse(auth)
  const user = await User.findOne({ username: token })

  if (user) {
    return user
  } else {
    return false
  }
}