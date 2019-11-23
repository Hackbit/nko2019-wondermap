export default ({ children, className }) => (
  <div className={`
    bg-dark-2
    p-8 rounded-lg
    break-words
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