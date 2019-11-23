import '../styles/index.css'
import useSWR, { mutate } from 'swr'
import { Plus, Trash2 } from 'react-feather'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../components/layout'
import { CardLoader, LinkCard, CardIcon } from '../components/card'
import Heading from '../components/heading'
import Button from '../components/button'
import { authedFetch, swrAuthedFetch, withAuthSync } from '../lib/client/auth'

const Page = ({ user }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: { user } })
  const lists = useSWR('/api/lists', swrAuthedFetch)

  return (
    <Layout profile={profile}>
      <Heading className='mb-12'>
        The Lists of {profile.data ? profile.data.user.name : 'Loading...'}{' '}
        
        <Button
          ghost className='ml-4 align-top rounded-full'
          onClick={async () => {
            const name = prompt('Name?')
            await authedFetch({}, '/api/add-list', { name })
            mutate('/api/lists', { lists: [
              ...lists.data.lists,
              { name, sharingId: Math.random(), __fake: true }
            ] })
          }}
        >
          <Plus />
        </Button>
      </Heading>

      {lists.data ? lists.data.lists.length ? (
        <div className='grid'>
          {lists.data.lists.map((data, listIndex) => (
            <Link href={data.__fake ? '#' : `/list/${encodeURIComponent(data.sharingId)}`}>
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
          No cards here! You should try creating one.
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