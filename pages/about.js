import '../styles/index.css'
import Layout from '../components/layout'
import Heading from '../components/heading'

const dependencies = [
  {
    name: 'React',
    key: 'react'
  },
  {
    name: 'Next.js',
    key: 'nextjs'
  },
  {
    name: 'Node.js',
    key: 'nodejs'
  },
  {
    name: 'Tailwind.css',
    key: 'tailwind'
  },
  {
    name: 'MongoDB',
    key: 'mongodb'
  },
  {
    name: 'GitHub',
    key: 'github'
  }
]

export default () => (
  <Layout title='About'>
    <Heading level={1} bottom={6} className='text-4xl'>
      About WonderMap
    </Heading>

    <p className='mb-12'>
      WonderMap is a 48-hour project created by two programmers in a sparse amount of time.{' '}
      It's intended to be a Google Keep and Evernote hybrid, with sharing functionality and notes.{' '}
      We got quite far, but a few things that are planned for the future include teams and projects for{' '}
      better sharing, better authentication, cleaner code, and a mind map style view.
    </p>

    <div className='grid'>
      {dependencies.map(({ name, key }) => (
        <div key={key} className='p-2 opacity-75 hover:opacity-100 transitions bg-white h-32 rounded-lg flex flex-col items-center justify-center' title={name}>
          <img src={`/images/${key}.svg`} style={{ maxWidth: '50%', maxHeight: '6rem', height: '100%' }} alt={name} />
        </div>
      ))}
    </div>
    <p className='mt-2 text-center text-light-3'>
      This wouldn't have been possible without tons of awesome projects.
    </p>
  </Layout>
)