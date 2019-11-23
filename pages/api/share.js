import getUser from '../../lib/server/get-user'
import { connect, Card, List } from '../../lib/server/db'

export default async (req, res) => {
  const { sharingId, isPublic } = req.body

  try {
    await connect()

    if (typeof sharingId !== 'string' || sharingId.length === 0) {
      throw new Error('No sharing id')
    }
    if (typeof isPublic !== 'boolean') {
      throw new Error('isPublic or private not specified')
    }

    const user = await getUser(req)

    const list = await List.findOne({ user, sharingId })
    if (!list) return res.status(404).json({ message: 'List not found' })

    list.isPublic = isPublic
    await list.save()

    return res.status(200).json({})
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}