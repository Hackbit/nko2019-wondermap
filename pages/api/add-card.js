import getUser from '../../lib/server/get-user'
import { connect, Card } from '../../lib/server/db'

export default async (req, res) => {
  const { items, list } = await req.body

  try {
    await connect()
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('No items')
    }
    if (typeof list !== 'object' || Array.isArray(list)) {
      throw new Error('No list')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const card = new Card({ user, items, list })
    await card.save()

    return res.status(200).json({ card })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}