import mql from '@microlink/mql'

export default async (req, res) => {
  const url = req.query.url

  try {
    const meta = await mql(url)
    return res.status(200).json(meta.data || {})
  } catch (error) {
    return res.status(200).json({})
  }
}