import '../styles/index.css'
import { useState, useEffect } from 'react'
import Typing from 'react-typing-animation'
import Layout from '../components/layout'
import Heading from '../components/heading'

const verbs = ['Save', 'Share', 'Organize', 'Capture', 'List', 'Yeet']

export default () => {
  const [verb, setVerb] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setVerb((verb) => (verb + 1) % verbs.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Heading level={1} bottom={6} className='sm:text-4xl sm:text-center'>
        <Typing className='inline' cursor={<span className='font-normal'>|</span>}>
          <span>{verbs[verb]}</span>
          <Typing.Delay ms={1000} />
          <Typing.Backspace count={50} />
        </Typing>{' '}
        <span className='font-normal'>your thoughts with</span>{' '}
        <span>WonderMap</span>
      </Heading>

      <p className='text-light-2 text-xl sm:text-center'>
        Our minds are always racing. We can help you save <span className='text-dark-4'>(almost)</span> every thought.
      </p>
    </Layout>
  )
}