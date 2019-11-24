import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default () => {
  const votes = useSWR('/api/votes', fetcher)

  return (
    <footer className='bg-dark-2 p-4 mt-10 fixed w-full bottom-0 z-30'>
      <div className='sm:flex items-center justify-between max-w-5xl mx-auto'>
        <p>
          Created with ❤️ by{' '}
          <a href='https://twitter.com/kognise' target='_blank' className='text-primary hover:underline'>Kognise</a>
          {' & '}
          <a href='https://twitter.com/joshkmartinez' target='_blank' className='text-primary hover:underline'>joshkmartinez</a>
        </p>
        <p>
          Vote for us on{' '}
          <a href='https://www.nodeknockout.com/entries/105-wondermap/vote' target='_blank' className='text-primary hover:underline'>
            Node Knockout ({votes.data ? votes.data.vote_count : '...'} votes)
          </a>!
        </p>
      </div>
    </footer>
  )
}