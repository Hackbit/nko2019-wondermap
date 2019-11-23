import { forwardRef } from 'react'

const shared = `
  bg-dark-2
  p-8 rounded-lg
  break-words
  relative
`

export default ({ children, className }) => (
  <div className={`
    ${shared}
    ${className || ''}
  `}>
    {children}
  </div>
)

export const LinkCard = forwardRef((props, ref) => (
  <a {...props} className={`
    ${shared} block transitions
    focus:outline-none focus:shadow-outline
    hover:up cursor-pointer
    ${props.className || ''}
  `} ref={ref} />
))

export const CardLoader = ({ className }) => (
  <div className={`
    ${shared}
    loading h-48
    ${className || ''}
  `} />
)

export const CardIcon = ({ icon: Icon, onClick }) => (
  <button className={`
    absolute top-0 right-0 text-light-3 p-2
    rounded-full transitions hover:text-light-1
    focus:outline-none focus:shadow-outline
  `} onClick={onClick}>
    <Icon />
  </button>
)