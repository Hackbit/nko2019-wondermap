import '../styles/index.css'
import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import Card from '../components/card'
import Input from '../components/input'
import Label from '../components/label'
import Button from '../components/button'
import Heading from '../components/heading'
import { login } from '../lib/client/auth'

export default () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setUsername('')
    setPassword('')
    setError('')

    const url = '/api/login'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const parsed = await response.json()

      if (response.status === 200) {
        const { token } = parsed
        await login({ token })
      } else {
        throw new Error(parsed.message)
      }
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return (
    <Layout centered>
      <Heading level={1} className='text-center'>Get Started</Heading>
      <Card className='max-w-sm mx-auto'>
        <form onSubmit={handleSubmit}>
          <Label htmlFor='username'>Username</Label>
          <Input
            type='text'
            id='username'
            name='username'
            value={username}
            className='mb-6'
            onChange={(event) => setUsername(event.target.value)}
          />

          <Label htmlFor='password'>Password</Label>
          <Input
            type='text'
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='mb-6'
          />

          <Button type='submit' loading={loading} className='w-full'>Login or Sign Up</Button>
          {error && <p className='text-error text-bold mt-3 text-center'>{error.message}</p>}
        </form>
      </Card>
    </Layout>
  )
}