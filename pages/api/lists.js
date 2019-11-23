import getUser from '../../lib/server/get-user'
import { List } from '../../lib/server/db'

export default async (req, res) => {
  try {
    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const lists = await List.find({ user })
    return res.status(200).json({ lists })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}