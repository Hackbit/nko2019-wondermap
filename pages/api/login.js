import { connect, User } from '../../lib/server/db'

export default async (req, res) => {
  const { username } = await req.body
  
  try {
    await connect()
    if (typeof username !== 'string' || username.trim().length === 0) {
      throw new Error('No username')
    }

    const foundUser = await User.findOne({ username })
    if (!foundUser) {
      const user = new User({ username })
      await user.save()
    }

    // FIXME: There's literally no auth here
    res.status(200).json({ token: username })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}