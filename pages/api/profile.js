import { connect } from '../../lib/server/db'
import getUser from '../../lib/server/get-user'

export default async (req, res) => {
  try {
    await connect()
    const user = await getUser(req)
    if (!user) return res.status(401).json({ message: 'Not logged in' })

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}