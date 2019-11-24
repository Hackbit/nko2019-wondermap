import '../styles/index.css'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Plus, Trash2 } from 'react-feather'
import Modal from 'react-modal'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../components/layout'
import { CardLoader, LinkCard, CardIcon } from '../components/card'
import Heading from '../components/heading'
import Button from '../components/button'
import Input from '../components/input'
import { authedFetch, swrAuthedFetch, withAuthSync } from '../lib/client/auth'

const Page = ({ user }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: { user } })
  const lists = useSWR('/api/lists', swrAuthedFetch)

  const [ showModal, setShowModal ] = useState(false)
  const [ name, setName ] = useState('')
  const [ creating, setCreating ] = useState(false)
  const close = () => {
    setName('')
    setCreating(false)
    setShowModal(false)
  }

  return (
    <Layout profile={profile} title='Lists'>
      <Modal
        isOpen={showModal}
        onRequestClose={close}
        overlayClassName='z-40 fixed top-0 p-2 left-0 right-0 bottom-0 bg-overlay flex flex-col items-center sm:justify-center'
        className='z-50 w-full p-8 max-w-xl bg-dark-2 rounded-lg focus:outline-none'
        ariaHideApp={false}
      >
        <Heading level={2} bottom={2}>New List</Heading>
        <p className='mb-6'>
          Create a list to organize and share cards. Cards can contain any content you want.
        </p>

        <form onSubmit={async (event) => {
          event.preventDefault()
          setName('')
          setCreating(true)
          await authedFetch({}, '/api/add-list', { name })
          mutate('/api/lists', { lists: [
            ...lists.data.lists,
            { name, sharingId: Math.random(), __fake: true }
          ] })
          setCreating(false)
          setShowModal(false)
        }}>
          <Input
            aria-label='Name'
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='mb-6'
          />

          <Button className='rounded-r-none' loading={creating} disabled={!name.trim()} type='submit'>
            Create
          </Button>
          <Button type='button' ghost onClick={close} className='rounded-l-none'>
            Cancel
          </Button>
        </form>
      </Modal>

      <Heading bottom={12}>
        Your Lists{' '}
        
        <Button
          ghost className='ml-4 align-top rounded-full'
          onClick={() => setShowModal(true)}>
          <Plus />
        </Button>
      </Heading>

      {lists.data ? lists.data.lists.length ? (
        <div className='grid'>
          {lists.data.lists.map((data, listIndex) => (
            <Link href={data.__fake ? '#' : `/list/${encodeURIComponent(data.sharingId)}`} passHref>
              <LinkCard key={data.sharingId}>
                <h2 className='text-light-1 font-bold'>
                  {data.name}
                </h2>
                <p className='text-light-2'>
                  This list is {data.isPublic ? 'public' : 'private'}.
                </p>
                <CardIcon icon={Trash2} onClick={async (event) => {
                  event.stopPropagation()
                  await authedFetch({}, '/api/delete-list', { id: data._id })
                  mutate('/api/lists', { lists: [
                    ...lists.data.lists.slice(0, listIndex),
                    ...lists.data.lists.slice(listIndex + 1)
                  ] })
                }} />
              </LinkCard>
            </Link>
          ))}
        </div>
      ) : (
        // TODO: Better view here
        <p className='text-dark-4 text-xl mt-16 text-center'>
          No lists here! Click the plus icon to create one.
        </p>
      ) : (
        <div className='grid'>
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
      )}
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