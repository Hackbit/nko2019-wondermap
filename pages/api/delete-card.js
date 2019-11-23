import getUser from '../../lib/server/get-user'
import { Card } from '../../lib/server/db'

export default async (req, res) => {
  const { id } = await req.body

  try {
    if (typeof id !== 'string' || id.length === 0) {
      throw new Error('No id')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const card = Card.findById(id)
    if (!card) return res.status(404).json({ message: 'Card not found' })

    await card.remove()
    return res.status(200).json({})
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}