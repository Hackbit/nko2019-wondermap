import uid from 'uid-promise'
import getUser from '../../lib/server/get-user'
import { connect, List, Card } from '../../lib/server/db'

export default async (req, res) => {
  const { name } = await req.body

  try {
    await connect()
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('No name')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    const sharingId = await uid(20)
    const list = new List({
      user,
      name,
      sharingId,
      isPublic: false
    })
    await list.save()

    const card = new Card({
      user, list,
      items: [
        {
          type: 'TEXT',
          key: 'Intro',
          value: 'WonderMap lets you create, organize, and share key-value-mapping-based cards. If you\'re familiar with JSON, each card is similar to an object.'
        },
        {
          type: 'TEXT',
          key: 'Next steps',
          value: 'Feel free to explore the interface and create a few cards.'
        }
      ]
    })
    await card.save()

    return res.status(200).json({ list })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}