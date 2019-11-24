import '../styles/index.css'
import Layout from '../components/layout'
import Heading from '../components/heading'
import { LinkButton } from '../components/button'

export default () => (
  <Layout title='Tips'>
    <Heading level={1} className='text-4xl'>
      Tips &amp; Tricks
    </Heading>
    <p className='mb-12'>
      WonderMap is more powerful than you might expect, this document contains a list of the coolest features.
    </p>

    <Heading level={2}>The Basics</Heading>
    <p className='mb-4'>
      The center concept of WonderMap is cards with key/value pairs. Each card has a list of sections that has a key (title){' '}
      and a value (content). Depending on the type of the section, the value can be anything from some text notes to a website URL!{' '}
      This is insanely useful because you can store essentially whatever you like in whatever structure you're comfortable with.
    </p>
    <p className='mb-10'>
      If you're familiar with JSON objects, this is an easy mindset to get into.
    </p>

    <Heading level={2}>Markdown</Heading>
    <p className='mb-4'>
      You can format your text with Markdown, a simple text formatting system that lets you add <strong><em>style</em></strong> to your notes!
      For most styles you can just add a few characters around your text.
    </p>
    <p className='mb-4'>
      For basic styles, <code>*OwO*</code> becomes <em>OwO</em>, <code>**OwO**</code> becomes <strong>OwO</strong>, and you guessed it!{' '}
      <code>***OwO***</code> becomes <strong><em>OwO</em></strong>. You can also do <code>~~OwO~~</code> for <del>OwO</del>.
    </p>
    <p className='mb-10'>
      If you put a hashtag before a line, it'll stand out from the rest of the content.
      <pre><code># Special heading text<br />Some boring old regular text</code></pre>
    </p>
    
    <Heading level={2}>LaTeX</Heading>
    <p className='mb-4'>
      LaTeX is a high-quality typesetting system that's amazing for marking up technical and scientific notes, especially math formulas.{' '}
      It's also the standard for the communication and publication of scientific documents.
    </p>
    <p className='mb-4'>
      Simply surround formulas with dollar signs (<code>$x = \sin(y)$</code>) to render them.
    </p>
    <LinkButton target='_blank' className='mb-10' href='https://www.latex-project.org/about/'>
      Learn more about LaTeX
    </LinkButton>

    <Heading level={2}>Sharing</Heading>
    <p className='mb-4'>
      You can share your lists with anyone in the world! Just press the sharing icon next to the list name{' '}
      and click the checkbox to set your list's visibility to public.{' '}
      Then, simply copy the page URL and send it around so anyone will be able to see your deepest darkest secrets.
    </p>
    <p className='mb-10'>
      If you send a link on cool apps like Twitter, Discord, Slack, and more, you might even see an awesome embed{' '}
      pop up with a beautiful colorful banner and some metadata.
    </p>

    <Heading level={2}>Profiles</Heading>
    <p className='mb-10'>
      On the topic of sharing, you also have a user profile link you can share. It'll show your name, username, and all your public lists!
    </p>

    <Heading level={2}>Keyless Values</Heading>
    <p className='mb-10'>
      It's totally fine to have values without keys! This is especially useful when you just want a card with an embed{' '}
      or a note, and don't want to worry about naming your sections. Just make sure the values don't get <em>too</em> lonely,{' '}
      nobody likes sad values.
    </p>
  </Layout>
)