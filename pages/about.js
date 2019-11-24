import '../styles/index.css'
import { Box } from 'react-feather'
import Layout from '../components/layout'
import Heading from '../components/heading'
import Button from '../components/button'
import Label from '../components/label'
import Input from '../components/input'
import OG from '../components/og'
import Card, { CardIcon, CardLoader } from '../components/card'

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
    <Heading level={1} className='text-4xl'>
      About WonderMap
    </Heading>

    <p className='mb-4'>
      WonderMap is a 48-hour project created by two programmers in a sparse amount of time.{' '}
      It's intended to be a Google Keep and Evernote hybrid, with sharing functionality and notes.{' '}
      We got quite far, but a few things that are planned for the future include teams and projects for{' '}
      better sharing, better authentication, cleaner code, and a mind map style view.
    </p>
    <p className='mb-12'>
      For the record, this entire website was entirely thought up, designed, styled, and scripted by us.
    </p>

    <div className='grid'>
      {dependencies.map(({ name, key }) => (
        <div key={key} className='p-2 opacity-75 hover:opacity-100 transitions bg-white h-32 rounded-lg flex flex-col items-center justify-center' title={name}>
          <img src={`/images/${key}.svg`} style={{ maxWidth: '50%', maxHeight: '6rem', height: '100%' }} alt={name} />
        </div>
      ))}
    </div>
    <p className='mt-2 text-center text-light-3 mb-16'>
      This wouldn't have been possible without tons of awesome projects.
    </p>

    <Heading level={2}>
      Design
    </Heading>
    <p className='mb-12'>
      We created a psuedo design system, which means we get to have a cool page demonstrating the components!
    </p>

    <Heading level={1}>Heading 1</Heading>
    <Heading level={2}>Heading 2</Heading>
    <Heading level={3}>Heading 3</Heading>
    <p className='mb-6'>
      Text is set in 16px Rubik.{' '}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae neque at dui vehicula consectetur at eu lacus. Sed nec mauris molestie, rutrum tellus sit amet, dictum enim. Pellentesque mollis lacus ex, vitae blandit felis dignissim nec. Sed quis luctus mauris. Aenean ut aliquet diam, ut consequat felis. Vestibulum at rutrum purus, sagittis interdum enim. Donec leo quam, egestas vitae semper vel, gravida ac nisl. Donec turpis tellus, dignissim sit amet malesuada ut, auctor in lectus.
    </p>
    
    <div className='mb-12'>
      <Button className='mr-4'>Filled button</Button>
      <Button className='mr-4' loading>Loading button</Button>
      <Button ghost>Ghost button</Button>
    </div>

    <div className='mb-12'>
      <Label htmlFor='input'>
        Label
      </Label>
      <Input
        placeholder='Some text'
        id='input'
        name='input'
        type='text'
      />
    </div>

    <div className='grid mb-6'>
      {new Array(6).fill(0).map((_, index) => (
        <Card index={index}>
          <Heading level={3} bottom={2}>Card</Heading>
          <p>This is a card in a grid, it can contain anything from a form to some metadata, and can have an icon in the top right.</p>
          <CardIcon icon={Box} />
        </Card>
      ))}
    </div>

    <p className='mb-1'>We also have a card loading placeholder.</p>
    <div className='grid mb-6'>
      {new Array(3).fill(0).map((_, index) => (
        <CardLoader index={index} />
      ))}
    </div>

    <p className='mb-1'>The below component is designed for rendering website embeds.</p>
    <OG url='https://kognise.dev/' />
  </Layout>
)