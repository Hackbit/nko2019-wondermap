import '../styles/index.css'
import Heading from '../components/heading'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <Heading>WonderMap</Heading>
    <p>Don't bother trying any of this out yet.</p>

    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
)