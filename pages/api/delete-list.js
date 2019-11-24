import getUser from '../../lib/server/get-user'
import { connect, List } from '../../lib/server/db'

export default async (req, res) => {
  const { id } = await req.body

  try {
    await connect()
    if (typeof id !== 'string' || id.length === 0) {
      throw new Error('No id')
    }

    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    await List.findOneAndDelete({ _id: id, user })
    return res.status(200).json({})
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}