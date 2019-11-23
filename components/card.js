export default ({ children, className }) => (
  <div className={`
    bg-dark-2
    p-8 rounded-lg
    break-words
    relative
    ${className || ''}
  `}>
    {children}
  </div>
)

export const CardLoader = ({ className }) => (
  <div className={`
    bg-dark-2
    p-8 rounded-lg
    loading
    h-48
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