import fetch from 'isomorphic-unfetch'

export default async (_, res) => {
  const rex = await fetch('https://www.nodeknockout.com/entries/105-wondermap/vote/stats')
  const json = await rex.json()
  return res.status(200).json(json)
}