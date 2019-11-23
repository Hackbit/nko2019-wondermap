import '../styles/index.css'
import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import Card from '../components/card'
import Input from '../components/input'
import Label from '../components/label'
import Button from '../components/button'
import { login } from '../lib/client/auth'

export default () => {
  const [ username, setUsername ] = useState('')
  const [ error, setError ] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setUsername('')
    setError('')

    const url = '/api/login'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })

      if (response.status === 200) {
        const { token } = await response.json()
        await login({ token })
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <Layout centered>
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

          <Button type='submit' className='w-full'>Login</Button>
          {error && <p className='text-error text-bold'>{error.message}</p>}
        </form>
      </Card>
    </Layout>
  )
}