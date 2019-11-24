import '../styles/index.css'
import Layout from '../components/layout'
import Heading from '../components/heading'

export default () => (
  <Layout centered>
    <Heading level={1} bottom={6} className='sm:text-4xl text-center'>
      It looks like you're offline!
    </Heading>

    <p className='text-light-3 text-xl text-center'>
      Try again when you get your internet connection back.
    </p>
  </Layout>
)