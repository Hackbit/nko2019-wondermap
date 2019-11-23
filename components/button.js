import { forwardRef } from 'react'

const getClassName = (props) => `
  ${props.ghost ? 'bg-transparent' : 'bg-primary'}
  border border-primary
  transitions
  hover:bg-primary text-light-1 font-bold inline-block
  py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-outline
  cursor-pointer ${props.disabled ? 'cursor-not-allowed opacity-50 hover:shadow-none' : ''}
  ${props.className || ''}
`

export default (props) => (
  <button {...props} className={getClassName(props)} />
)

export const LinkButton = forwardRef((props, ref) => (
  <a {...props} ref={ref} className={getClassName(props)} />
))