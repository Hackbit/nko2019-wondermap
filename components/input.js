export default (props) => (
  <input {...props} className={`
    appearance-none border rounded
    w-full py-2 px-4
    bg-dark-3 leading-tight
    focus:outline-none focus:shadow-outline
    ${props.className || ''}
  `} />
)