export default () => (
  <header className='bg-dark-2 p-4 mt-10 fixed w-full bottom-0 z-30'>
    <div className='sm:flex items-center justify-between max-w-5xl mx-auto'>
      <p>
        Created with ❤️ by{' '}
        <a href='https://twitter.com/kognise' target='_blank' className='text-primary hover:underline'>Kognise</a>
        {' & '}
        <a href='https://twitter.com/joshkmartinez' target='_blank' className='text-primary hover:underline'>joshkmartinez</a>
      </p>
      <p>
        Vote for us on{' '}
        <a href='http://www.nodeknockout.com/entries/105-wondermap/vote' target='_blank' className='text-primary hover:underline'>Node Knockout</a>!
      </p>
    </div>
  </header>
)