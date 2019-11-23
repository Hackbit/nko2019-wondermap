import getUser from '../../lib/server/get-user'
import { Card } from '../../lib/server/db'

export default async (req, res) => {
  const { items } = await req.body

  try {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('No items')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const card = new Card({ user, items })
    await card.save()

    return res.status(200).json({ card })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}