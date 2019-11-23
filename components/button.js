import { forwardRef } from 'react'

const getClassName = (props) => `
  ${props.ghost ? `
    bg-transparents
    border border-primary
  ` : 'bg-primary'}
  hover:bg-primary text-light-1 font-bold inline-block
  py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-outline
  cursor-pointer
  ${props.className || ''}
`
export default (props) => (
  <button {...props} className={getClassName(props)} />
)

export const LinkButton = forwardRef((props, ref) => (
  <a {...props} ref={ref} className={getClassName(props)} />
))