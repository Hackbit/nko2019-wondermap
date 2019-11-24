import { connect } from '../../lib/server/db'
import getUser from '../../lib/server/get-user'
import hash from 'password-hash'

export default async (req, res) => {
  const { name, password } = await req.body

  try {
    await connect()

    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('No name')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    user.name = name
    if (password) {
      if (password.length < 4) {
        throw new Error('Password should be 4 characters or greater')
      }
      const hashed = hash.generate(password)
      user.password = hashed
    }

    await user.save()
    return res.status(200).json({})
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}