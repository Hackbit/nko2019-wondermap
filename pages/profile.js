import '../styles/index.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'react-feather'
import useSWR, { mutate } from 'swr'
import Router from 'next/router'
import Button, { LinkButton } from '../components/button'
import Card from '../components/card'
import Layout from '../components/layout'
import Heading from '../components/heading'
import Label from '../components/label'
import Input from '../components/input'
import { authedFetch, logout, swrAuthedFetch, withAuthSync } from '../lib/client/auth'

const Page = ({ user }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: { user } })
  const [ tempName, setTempName ] = useState(profile.data ? profile.data.user.name : '')
  const [ tempPW, setTempPW ] = useState('')
  const [ updating, setUpdating ] = useState(false)
  useEffect(() => setTempName(profile.data ? profile.data.user.name : ''), [ profile.data ])

  return (
    <Layout profile={profile} title='Profile'>
      <Heading level={1}>
        {tempName.length ? tempName : 'No-Name'}{' '}
        ({profile.data ? profile.data.user.username : 'Loading...'}){' '}
        <Link href={profile.data ? `/user/${encodeURIComponent(profile.data.user.username)}` : '#'} passHref>
          <LinkButton target='_blank' ghost className='ml-4 align-top rounded-full'>
            <ExternalLink />
          </LinkButton>
        </Link>
      </Heading>

      <Card className='mb-8'>
        <form onSubmit={async (event) => {
          event.preventDefault()
          setUpdating(true)
          setTempPW('')
          await authedFetch({}, '/api/update-profile', { name: tempName, password: tempPW })
          mutate('/api/profile', {
            user: {
              ...profile.data.user,
              name: tempName
            }
          })
          setUpdating(false)
        }}>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            value={tempName}
            className='mb-6'
            onChange={(event) => setTempName(event.target.value)}
          />

          <Label htmlFor='password'>New password</Label>
          <Input
            type='password'
            id='password'
            name='password'
            value={tempPW}
            className='mb-6'
            onChange={(event) => setTempPW(event.target.value)}
          />

          <Button loading={updating}>
            Update
          </Button>
        </form>
      </Card>

      <Button ghost onClick={logout} className='w-full'>Log Out</Button>
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