import '../styles/index.css'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import Router from 'next/router'
import Layout from '../components/layout'
import Card from '../components/card'
import ItemsInput from '../components/items-input'
import { authedFetch, swrAuthedFetch, withAuthSync } from '../lib/client/auth'

const Page = ({ profile: initialProfile }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: initialProfile })
  const cards = useSWR('/api/cards', swrAuthedFetch)
  const [ items, setItems ] = useState([])

  return (
    <Layout>
      <h1>{profile.data ? profile.data.user.name : 'Loading...'}</h1>
      <p>{profile.data ? profile.data.user.username : 'Loading...'}</p>

      {cards.data ? cards.data.cards.map((data) => <Card data={data} />): 'Loading...'}

      <form onSubmit={async (event) => {
        event.preventDefault()
        if (items.length > 0) {
          await authedFetch({}, '/api/add-card', { items })
          mutate('/api/cards', { cards: [
            ...cards.data.cards,
            { items, _id: Math.random() }
          ] })
        }
      }}>
        <ItemsInput
          items={items}
          setItems={setItems}
          legend='Items'
        />
        <button type='submit' disabled={items.length === 0}>
          Submit!
        </button>
      </form>
    </Layout>
  )
}

Page.getInitialProps = async (ctx) => {
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    return await authedFetch(ctx, '/api/profile')
  } catch (error) {
    return await redirectOnError()
  }
}

export default withAuthSync(Page)