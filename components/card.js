// export default ({ data: { items, _id } }) => (
//   <div className='mb-3' key={_id}>
//     {items.map(({ key, value }, index) => (
//       <div className='mb-1' key={index}>
//         <div className='font-bold'>{key}</div>
//         <div>{value}</div>
//       </div>
//     ))}
//   </div>
// )

export default ({ children, className }) => (
  <div className={`
    bg-dark-2
    p-8 rounded-lg
    ${className || ''}
  `}>
    {children}
  </div>
)