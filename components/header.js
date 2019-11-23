import Link from 'next/link'
import useSWR from 'swr'
import { logout, swrAuthedFetch } from '../lib/client/auth'
import Button, { LinkButton } from './button'

export default ({ className, profile: defaultProfile }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, defaultProfile)

  return (
    <header className={`bg-dark-2 p-4 mb-10 fixed w-full top-0 ${className || ''}`}>
      <nav className='flex items-center justify-between max-w-5xl mx-auto'>
        <ul className='flex items-center'>
          <li className='mr-4'>
            <Link href='/'>
              <a className='hover:underline'>Home</a>
            </Link>
          </li>
        </ul>
        <ul className='flex items-center'>
          {(profile.error || !profile.data) ? (
            <li>
              <Link href='/login'>
                <LinkButton>Login</LinkButton>
              </Link>
            </li>
          ) : (<>
            <li>
              <Button onClick={logout}>Logout</Button>
            </li>
            <li>
              <Link href='/profile'>
                <a className='ml-4 rounded-full focus:outline-none focus:shadow-outline hover:shadow-outline block transitions'>
                  <img
                    src={`https://api.adorable.io/avatars/285/${encodeURIComponent(profile.data.user.username)}.png`}
                    className='h-10 w-10 rounded-full object-cover'
                  />
                </a>
              </Link>
            </li>
          </>)}
        </ul>
      </nav>
    </header>
  )
}