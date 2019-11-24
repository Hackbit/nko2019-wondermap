import Input, { Select, TextArea } from './input'
import { Trash2, Plus } from 'react-feather'
import Button from './button'
import types from '../lib/shared/types'

export default ({ items, setItems, emptyItem, className }) => (
  <fieldset className={className}>
    <legend className='sr-only'>Items</legend>
    {items.map(({ key, value, type }, index) => {
      const ValueComponent = type === 'TEXT' ? TextArea : Input
      return (
        <div key={index} className='mb-6'>
          <div className='sm:flex mb-2'>
            <Select className='mb-2 sm:mr-2 sm:mb-0' onChange={(event) => setItems([
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
              className='sm:mr-2'
              onChange={(event) => setItems([
                ...items.slice(0, index),
                { key: event.target.value, value, type },
                ...items.slice(index + 1)
              ])}
            />
          </div>

          <div className='sm:flex'>
            <ValueComponent
              aria-label='Value'
              placeholder='Value'
              className='sm:mr-2'
              value={value}
              onChange={(event) => setItems([
                ...items.slice(0, index),
                { key, value: event.target.value, type },
                ...items.slice(index + 1)
              ])}
            />
            
            <Button ghost type='button' className='rounded-r-none' onClick={() => setItems([ ...items.slice(0, index + 1), emptyItem, ...items.slice(index + 1) ])}>
              <Plus />
            </Button>
            <Button type='button' className='rounded-l-none' disabled={items.length === 1} onClick={() => setItems([ ...items.slice(0, index), ...items.slice(index + 1) ])}>
              <Trash2 />
            </Button>
          </div>
        </div>
      )
    })}
  </fieldset>
)