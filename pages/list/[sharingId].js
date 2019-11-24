import '../../styles/index.css'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Trash2, Share } from 'react-feather'
import Router from 'next/router'
import Modal from 'react-modal'
import Input from '../../components/input'
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

const Page = ({ user: initialProfile, cards: initialCards, list, hasAccess }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: { user: initialProfile } })
  const cardsUrl = `/api/list?sharingId=${encodeURIComponent(list.sharingId)}`
  const cards = useSWR(cardsUrl, swrAuthedFetch, { initialData: { cards: initialCards} })

  const [ items, setItems ] = useState([ emptyItem ])
  const [ adding, setAdding ] = useState(false)

  const [ showModal, setShowModal ] = useState(false)
  const [ sharing, setSharing ] = useState(false)
  const [ tempPublic, setTempPublic ] = useState(list.isPublic)
  const close = () => {
    setTempPublic(list.isPublic)
    setSharing(false)
    setShowModal(false)
  }

  return (
    <Layout profile={profile}>
      <Modal
        isOpen={showModal}
        onRequestClose={close}
        overlayClassName='z-40 fixed top-0 p-2 left-0 right-0 bottom-0 bg-overlay flex flex-col items-center sm:justify-center'
        className='z-50 w-full p-8 max-w-xl bg-dark-2 rounded-lg focus:outline-none'
        ariaHideApp={false}
      >
        <Heading level={2} bottom={2}>Sharing Settings</Heading>
        <p className='mb-6'>
          If you publicize this list anyone with the link will be able to see it, but not edit it.
        </p>

        <form onSubmit={async (event) => {
          event.preventDefault()
          setSharing(true)
          await authedFetch({}, '/api/share', { sharingId: list.sharingId, isPublic: tempPublic })
          setSharing(false)
          setShowModal(false)
        }}>
          <label className='block font-bold mb-2 cursor-pointer'>
            <input
              className='mr-2 leading-tight align-center'
              type='checkbox'
              checked={tempPublic}
              onChange={(event) => setTempPublic(event.target.checked)}
            />
            <span className='text-md leading-tight'>
              Public
            </span>
          </label>

          {tempPublic && (
            <Input
              readOnly
              placeholder='Sharing URL'
              aria-label='Sharing URL'
              value={typeof window === 'undefined' ? '(loading)' : window.location.href}
            />
          )}

          <div className='mt-6'>
            <Button className='rounded-r-none' loading={sharing} type='submit'>
              Save
            </Button>
            <Button type='button' ghost onClick={close} className='rounded-l-none'>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Heading bottom={12}>
        {list.name}

        {hasAccess && (<>{' '}<Button
          ghost className='ml-4 align-top rounded-full'
          onClick={() => setShowModal(true)}
        >
          <Share />
        </Button></>)}
      </Heading>

      {hasAccess && <Card className='mb-16'>
        <form onSubmit={async (event) => {
          event.preventDefault()
          setAdding(true)
          setItems([ emptyItem ])
          await authedFetch({}, '/api/add-card', { items, list })
          mutate(cardsUrl, { cards: [
            ...cards.data.cards,
            { items, _id: Math.random() }
          ] })
          setAdding(false)
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
          <Button type='submit' disabled={items.length === 0} loading={adding}>
            Add!
          </Button>
        </form>
      </Card>}

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
    const { cards, list, hasAccess } = await authedFetch(ctx, `/api/list?sharingId=${encodeURIComponent(sharingId)}`)
    return { user, cards, list, hasAccess }
  } catch (error) {
    console.log(error)
    return await redirectOnError()
  }
}

export default withAuthSync(Page)