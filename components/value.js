import OG from './og'
import MD from 'react-markdown'
import MathJax from 'react-mathjax'
import RemarkMathPlugin from 'remark-math'

const mjaxProps = {
  plugins: [ RemarkMathPlugin ],
  renderers: {
    math: ({ value }) =>
      <MathJax.Node formula={value} />,
    inlineMath: ({ value }) =>
      <MathJax.Node inline formula={value} />
  }
}

export default ({ value, type }) => {
  switch (type) {
    case 'TEXT': {
      return (
        <MathJax.Provider>
          <MD
            className='text-light-2 markdown'
            source={value}
            linkTarget='_blank'
            {...mjaxProps}
          />
        </MathJax.Provider>
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