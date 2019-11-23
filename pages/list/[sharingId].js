import '../../styles/index.css'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Trash2 } from 'react-feather'
import Router from 'next/router'
import Button from '../../components/button'
import Layout from '../../components/layout'
import Card, { CardLoader, CardIcon } from '../../components/card'
import Heading from '../../components/heading'
import Value from '../../components/value'
import ItemsInput from '../../components/items-input'
import { authedFetch, swrAuthedFetch, withAuthSync } from '../../lib/client/auth'

const emptyItem = {
  key: '',
  value: '',
  type: 'TEXT'
}

const Page = ({ user: initialProfile, cards: initialCards, list }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: { user: initialProfile } })
  const cardsUrl = `/api/list?sharingId=${encodeURIComponent(list.sharingId)}`
  const cards = useSWR(cardsUrl, swrAuthedFetch, { initialData: { cards: initialCards} })
  const [ items, setItems ] = useState([ emptyItem ])

  return (
    <Layout profile={profile}>
      <Heading className='mb-12'>
        The Cards in {list.name}
      </Heading>

      <Card className='mb-16'>
        <form onSubmit={async (event) => {
          event.preventDefault()
          if (items.length > 0) {
            setItems([ emptyItem ])
            await authedFetch({}, '/api/add-card', { items, list })
            mutate(cardsUrl, { cards: [
              ...cards.data.cards,
              { items, _id: Math.random() }
            ] })
          }
        }}>
          <Heading level={2}>
            New Card
          </Heading>
          <ItemsInput
            items={items}
            setItems={setItems}
            emptyItem={emptyItem}
            className='mb-4'
          />
          <Button type='submit' disabled={items.length === 0}>
            Submit!
          </Button>
        </form>
      </Card>

      <div className='grid'>
        {cards.data ? cards.data.cards.map((data, cardIndex) => (
          <Card key={data._id}>
            {data.items.map(({ key, value, type }, index) => (
              <div className='mb-3' key={index}>
                <div className='font-bold text-light-1'>{key}</div>
                <Value value={value} type={type} />
              </div>
            ))}
            <CardIcon icon={Trash2} onClick={async () => {
              await authedFetch({}, '/api/delete-card', { id: data._id })
              mutate(cardsUrl, { cards: [
                ...cards.data.cards.slice(0, cardIndex),
                ...cards.data.cards.slice(cardIndex + 1)
              ] })
            }} />
          </Card>
        )): [ <CardLoader />, <CardLoader />, <CardLoader /> ]}
      </div>
    </Layout>
  )
}

Page.getInitialProps = async (ctx) => {
  const redirectOnError = () =>
    typeof window !== 'undefined'
      // FIXME: make no access page
      ? Router.push('/no-access')
      : ctx.res.writeHead(302, { Location: '/no-access' }).end()

  let user = null
  try {  
    user = (await authedFetch(ctx, '/api/profile')).user
  } catch(error) {
    // No-op, public lists exist
  }

  try {
    const sharingId = ctx.query.sharingId
    const { cards, list } = await authedFetch(ctx, `/api/list?sharingId=${encodeURIComponent(sharingId)}`)
    return { user, cards, list }
  } catch (error) {
    console.log(error)
    return await redirectOnError()
  }
}

export default withAuthSync(Page)