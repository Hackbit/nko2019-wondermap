import '../../styles/index.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import { LinkCard } from '../../components/card'
import { authedFetch } from '../../lib/client/auth'

const Page = ({ user, lists }) => {
  return (
    <Layout title={`${user.name} (${user.username})`}>
      <div className='flex items-center justify-center mb-20'>
        <div className='mr-8'>
          <img
            src={`https://api.adorable.io/avatars/285/${encodeURIComponent(user.username)}.png`}
            className='h-24 w-24 rounded-full object-cover'
          />
        </div>
        <div className='text-3xl'>
          <h1 className='font-bold text-light-1'>{user.name}</h1>
          <p>{user.username}</p>
        </div>
      </div>

      {lists.length ? (
        <div className='grid'>
          {lists.map((data) => (
            <Link href={`/list/${encodeURIComponent(data.sharingId)}`} key={data.sharingId}>
              <LinkCard>
                <h2 className='text-light-1 font-bold'>
                  {data.name}
                </h2>
              </LinkCard>
            </Link>
          ))}
        </div>
      ) : (
        // TODO: Better view here
        <p className='text-dark-4 text-xl mt-16 text-center'>
          This user does not have any public lists.
        </p>
      )}
    </Layout>
  )
}

Page.getInitialProps = async (ctx) => {
  const username = ctx.query.username
  return await authedFetch(ctx, `/api/public-profile?username=${encodeURIComponent(username)}`)
}

export default Page