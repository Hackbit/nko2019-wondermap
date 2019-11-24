import getUser from '../../lib/server/get-user'
import { connect, Card, List } from '../../lib/server/db'

export default async (req, res) => {
  const sharingId = req.query.sharingId

  try {
    await connect()
    if (typeof sharingId !== 'string' || sharingId.length === 0) {
      throw new Error('No sharing id')
    }

    const user = await getUser(req)
    const condition = user ? {
      $or: [
        { user },
        { isPublic: true }
      ]
    } : {
      isPublic: true
    }

    const list = await List.findOne({
      sharingId,
      ...condition
    })
    if (!list) return res.status(404).json({ message: 'List not found' })

    const cards = await Card.find({ list }).sort({ _id: -1 })

    const hasAccess = user && user._id.toString() === list.user.toString()
    return res.status(200).json({ cards, list, hasAccess })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}