import OG from './og'
import MD from 'react-markdown'

export default ({ value, type }) => {
  switch (type) {
    case 'TEXT': {
      return (
        <MD
          className='text-light-2 markdown'
          source={value}
          linkTarget='_blank'
        />
      )
    }
    case 'IMAGE': {
      return (
        <img
          src={value}
          className='block w-full rounded'
        />
      )
    }
    case 'EMBED': {
      return (
        <OG url={value} />
      )
    }
    default: {
      return 'Well, you\'re pretty screwed!'
    }
  }
}