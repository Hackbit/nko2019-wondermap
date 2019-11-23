import { useEffect } from 'react'
import useSWR, { mutate, trigger } from 'swr'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import getHost from './get-host'

export const login = ({ token }) => {
  cookie.set('token', token, { expires: 1 })
  trigger('/api/profile')
  Router.push('/profile')
}

export const auth = (ctx) => {
  const { token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  return token
}

export const logout = () => {
  cookie.remove('token')
  mutate('/api/profile', null)
  Router.push('/login')
}

export const authedFetch = async (ctx, url, body) => {
  const { token } = nextCookie(ctx)
  const apiUrl = getHost(ctx.req) + url
  
  const response = await fetch(apiUrl, {
    credentials: 'include',
    headers: {
      'Authorization': JSON.stringify({ token }),
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined
  })

  const json = await response.json()
  if (!response.ok) {
    throw new Error(json.message)
  } else {
    return json
  }
}

export const swrAuthedFetch = async (url) => await authedFetch({}, url)

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const profile = useSWR('/api/profile', swrAuthedFetch)

    useEffect(() => {
      console.log('uwu', profile)
      if (profile.error && !profile.data) {
        Router.push('/login')
      }
    }, [ profile.data ])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    const componentProps = WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return componentProps
  }

  return Wrapper
}