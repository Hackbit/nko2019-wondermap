export default ({ children, className, level = 1 }) => {
  const computedClassName = `
    text-${level === 1 ? 3 : level === 2 ? 2 : ''}xl font-bold text-light-1 mb-4
    ${className || ''}
  `

  if (level === 1) {
    return (
      <h1 className={computedClassName}>
        {children}
      </h1>
    )
  } else if (level === 2) {
    return (
      <h2 className={`${computedClassName} leading-tight`}>
        {children}
      </h2>
    )
  } else {
    return (
      <h3 className={computedClassName}>
        {children}
      </h3>
    )
  }
}