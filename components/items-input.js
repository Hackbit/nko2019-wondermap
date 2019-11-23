import Input, { Select } from './input'
import Button from './button'
import types from '../lib/shared/types'

export default ({ items, setItems, legend, className }) => (
  <fieldset className={className}>
    <legend className='font-bold mb-4'>{legend}</legend>
    {items.map(({ key, value, type }, index) => (
      <div key={index} className='mb-4 flex'>
        <Select className='mr-2' onChange={(event) => setItems([
          ...items.slice(0, index),
          { key, value, type: event.target.value },
          ...items.slice(index + 1)
        ])} value={type}>
          {types.map(({ name, key }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </Select>

        <Input
          aria-label='Key'
          placeholder='Key'
          value={key}
          className='mr-2'
          onChange={(event) => setItems([
            ...items.slice(0, index),
            { key: event.target.value, value, type },
            ...items.slice(index + 1)
          ])}
        />

        <Input
          aria-label='Value'
          placeholder='Value'
          className='mr-2 flex'
          value={value}
          onChange={(event) => setItems([
            ...items.slice(0, index),
            { key, value: event.target.value, type },
            ...items.slice(index + 1)
          ])}
        />
        <Button type='button' onClick={() => setItems([ ...items.slice(0, index), ...items.slice(index + 1) ])}>
          Remove
        </Button>
      </div>
    ))}
    <Button ghost type='button' onClick={() => setItems([ ...items, { key: '', value: '' }])}>
      Add
    </Button>
  </fieldset>
)