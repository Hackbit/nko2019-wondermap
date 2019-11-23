export default ({ children, className }) => (
  <div className={`
    bg-dark-2
    p-8 rounded-lg
    ${className || ''}
  `}>
    {children}
  </div>
)