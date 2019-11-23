import Link from 'next/link'
import useSWR from 'swr'
import { logout, swrAuthedFetch } from '../lib/client/auth'
import Button, { LinkButton } from './button'

export default ({ className }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch)

  return (
    <header className={`bg-dark-2 p-4 mb-10 fixed w-full top-0 ${className || ''}`}>
      <nav className='flex items-center justify-between max-w-5xl mx-auto'>
        <ul className='flex items-center'>
          <li className='mr-4'>
            <Link href='/'>
              <a className='hover:underline'>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/profile'>
              <a className='hover:underline'>Profile</a>
            </Link>
          </li>
        </ul>
        <ul className='flex items-center'>
          <li>
            {(profile.error || !profile.data) ? (
              <Link href='/login'>
                <LinkButton>Login</LinkButton>
              </Link>
            ) : (
              <Button onClick={logout}>Logout</Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}