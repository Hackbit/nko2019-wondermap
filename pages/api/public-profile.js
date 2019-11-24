import { connect, User, List } from '../../lib/server/db'

export default async (req, res) => {
  const { username } = req.query

  try {
    await connect()
    if (typeof username !== 'string' || username.length === 0) {
      throw new Error('No username')
    }

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const lists = await List.find({ user, isPublic: true })
    return res.status(200).json({ user, lists })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}