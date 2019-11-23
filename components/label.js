export default (props) => (
  <label {...props} className={`
    font-bold mb-1 block leading-none
    ${props.className || ''}
  `} />
)