import getUser from '../../lib/server/get-user'
import { Card, List } from '../../lib/server/db'

export default async (req, res) => {
  const sharingId = req.query.sharingId

  try {
    if (typeof sharingId !== 'string' || sharingId.length === 0) {
      throw new Error('No sharing id')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const list = await List.findOne({ sharingId, user })
    if (!list) return res.status(404).json({ message: 'List not found' })

    const cards = await Card.find({ user, list })
    return res.status(200).json({ cards, list })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}