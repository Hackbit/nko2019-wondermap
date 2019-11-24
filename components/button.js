import { forwardRef } from 'react'
import { Loader } from 'react-feather'

const getClassName = (props) => `
  ${props.ghost ? 'bg-transparent' : 'bg-primary'}
  border border-primary
  transitions
  hover:bg-primary text-light-1 font-bold inline-block
  py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-outline
  cursor-pointer ${props.disabled || props.loading ? 'cursor-not-allowed opacity-50 hover:shadow-none' : ''}
  ${props.className || ''}
`

export default (props) => (
  <button {...props} className={getClassName(props)}>
    {props.loading && (<><Loader className='inline-block align-top mr-1 spin' />{' '}</>)}
    {props.children}
  </button>
)

export const LinkButton = forwardRef((props, ref) => (
  <a {...props} ref={ref} className={getClassName(props)}>
    {props.loading && (<><Loader className='inline-block align-top mr-1 spin' />{' '}</>)}
    {props.children}
  </a>
))