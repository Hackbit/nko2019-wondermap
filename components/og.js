import useSWR from 'swr'
import TruncateMarkup from 'react-truncate-markup'

const fetcher = async (api, url) => {
  const res = await fetch(`${api}?url=${encodeURIComponent(url)}`)
  const js = await res.json()
  return js
}

export default ({ url }) => {
  const { data } = useSWR([ '/api/og', url ], fetcher)
  
  return data ? (
    <div className='bg-dark-3 rounded pb-3'>
      {data.image && <img src={data.image.url} className='rounded-t w-full' />}
      {data.title && <h3 className='px-3 mt-3 font-bold text-light-1'>{data.title}</h3>}
      {data.description && (
        <TruncateMarkup lines={3}>
          <p className='px-3 mt-1 text-light-3 text-sm'>{data.description}</p>
        </TruncateMarkup>
      )}
    </div>
  ) : <div className='h-32 bg-dark-3 rounded loading' />
}