import zxcvbn from 'zxcvbn'
import { useMemo } from 'react'

const messages = [
  'Horribly insecure',
  'Try a little harder',
  'Meh',
  'Not bad',
  'Awesome!'
]

const colors = [
  'red',
  'red',
  'orange',
  'blue',
  'green'
]

export default ({ password, className }) =>  {
  const { score } = useMemo(() => zxcvbn(password), [ password ])
  
  return (
    <div className={className}>
      <label className='block text-center text-light-3 leading-tight text-sm'>
        {messages[score]}
      </label>
      <progress
        value={score}
        max={4}
        className={`appearance-none h-6 w-full progress progress-${colors[score]} block`}
      />
    </div>
  )
}