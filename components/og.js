import useSWR from 'swr'
import TruncateMarkup from 'react-truncate-markup'

const fetcher = async (api, url) => {
  const res = await fetch(`${api}?url=${encodeURIComponent(url)}`)
  const js = await res.json()
  return js
}

export default ({ url, className }) => {
  const { data } = useSWR([ '/api/og', url ], fetcher)
  
  return data ? (
    <a className={`
      bg-dark-3 rounded pb-3 block hover:up transitions
      focus:outline-none focus:shadow-outline
      overflow-hidden
      ${className || ''}
    `} href={data.url} target='_blank' rel='noopener noreferrer'>
      {data.image && <img src={data.image.url} className='rounded-t w-full' />}
      {data.title && (
        <div className='px-3 mt-3'>
          <TruncateMarkup>
            <h3 className='font-bold text-light-1'>{data.title}</h3>
          </TruncateMarkup>
        </div>
      )}
      {data.description && (
        <div className='px-3 mt-1'>
          <TruncateMarkup lines={3}>
            <p className='text-light-3 text-sm'>{data.description}</p>
          </TruncateMarkup>
        </div>
      )}
    </a>
  ) : <div className='h-32 bg-dark-3 rounded loading' />
}