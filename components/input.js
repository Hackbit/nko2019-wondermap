import { ChevronDown } from 'react-feather'

const shared = `
  appearance-none border rounded
  w-full py-2 px-4
  bg-dark-3 leading-tight
  focus:outline-none focus:shadow-outline
  transitions
`

export default (props) => (
  <input {...props} className={`
    ${shared}
    ${props.className || ''}
  `} />
)

export const Select = (props) => (
  <div className={`inline-block relative w-full ${props.className || ''}`}>
    <select {...props} className={`
      ${shared} cursor-pointer h-full
    `} />
    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-light-3'>
      <ChevronDown />
    </div>
  </div>
)