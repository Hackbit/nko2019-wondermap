import Input from './input'
import Button from './button'

export default ({ items, setItems, legend }) => (
  <fieldset>
    <legend>{legend}</legend>
    {items.map(({ key, value }, index) => (
      <div key={index} className='mb-4'>
        <Input
          placeholder='Key'
          value={key}
          onChange={(event) => setItems([
            ...items.slice(0, index),
            { key: event.target.value, value },
            ...items.slice(index + 1)
          ])}
        />
        <Input
          placeholder='Value'
          value={value}
          onChange={(event) => setItems([
            ...items.slice(0, index),
            { key, value: event.target.value },
            ...items.slice(index + 1)
          ])}
        />
        <Button type='button' onClick={() => setItems([ ...items.slice(0, index), ...items.slice(index + 1) ])}>
          Remove
        </Button>
      </div>
    ))}
    <Button type='button' onClick={() => setItems([ ...items, { key: '', value: '' }])}>
      Add
    </Button>
  </fieldset>
)