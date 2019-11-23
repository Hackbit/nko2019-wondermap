import getUser from '../../lib/server/get-user'
import { Card } from '../../lib/server/db'

export default async (req, res) => {
  try {
    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const cards = await Card.find({ user })
    return res.status(200).json({ cards })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}