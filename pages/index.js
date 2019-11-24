import '../styles/index.css'
import Link from 'next/link'
import Typing from 'react-typing-animation'
import Layout from '../components/layout'
import Heading from '../components/heading'
import { LinkButton } from '../components/button'

const verbs = [ 'Save', 'Share', 'Organize', 'Capture', 'List', 'Yeet' ]

export default () => (
  <Layout>
    <Heading level={1} bottom={6} className='sm:text-4xl sm:text-center'>
      <Typing className='inline' cursor={<span className='font-normal text-light-3'>|</span>} loop>
        {verbs.map((verb) => (<>
          <span>{verb}</span>
          <Typing.Delay ms={1000} />
          <Typing.Backspace count={verb.length + 1} />
        </>))}
      </Typing>{' '}
      <span className='font-normal'>your thoughts with</span>{' '}
      <span>WonderMap</span>
    </Heading>

    <p className='text-light-2 text-xl mb-8 sm:text-center'>
      Our minds are always racing. We can help you save <span className='text-dark-4'>(almost)</span> every thought.
    </p>

    <div className='mx-auto mb-20 sm:text-center'>
      <Link href='/login'>
        <LinkButton>Get started</LinkButton>
      </Link>
    </div>

    <Heading level={2} className='sm:text-center'><span aria-hidden>📝</span> Rich Cards</Heading>
    <p className='text-light-3 max-w-md sm:text-center mx-auto mb-16'>
      Store content in structured JSON-like cards, with rich metadata including images and embeds. And plain old text if you want to be boring.
    </p>

    <Heading level={2} className='sm:text-center'><span aria-hidden>👥</span> Sharing</Heading>
    <p className='text-light-3 max-w-md sm:text-center mx-auto mb-16'>
      Want to pester your long-lost family with your Christmas wish list? We have your back!
    </p>

    <Heading level={2} className='sm:text-center'><span aria-hidden>🐛</span> Bugs</Heading>
    <p className='text-light-3 max-w-md sm:text-center mx-auto'>
      Two people made this in 48 hours for Node Knockout, so expect tons of bugs in an otherwise useful service.
    </p>
  </Layout>
)