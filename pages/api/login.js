import { connect, User, Token } from '../../lib/server/db'
import uid from 'uid-promise'
import hash from 'password-hash'

export default async (req, res) => {
  const { username, password } = await req.body
  
  try {
    await connect()
    if (typeof username !== 'string' || username.trim().length === 0) {
      throw new Error('No username')
    }
    if (typeof password !== 'string' || password.length === 0) {
      throw new Error('No password')
    }
    if (password.length < 4) {
      throw new Error('Password should be 4 characters or greater')
    }

    let user = await User.findOne({ username: username.trim() })
    if (user) {
      const valid = hash.verify(password, user.password)
      if (!valid) return res.status(403).json({ message: 'Incorrect password' })
    } else {
      const hashed = hash.generate(password)
      user = new User({ username: username.trim(), password: hashed })
      await user.save()
    }

    const tokenValue = await uid(64)
    const token = new Token({ user, value: tokenValue })
    await token.save()

    res.status(200).json({ token: tokenValue })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}