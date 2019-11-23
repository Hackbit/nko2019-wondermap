import mongoose from 'mongoose'
import types from '../shared/types'

const liveModel = (name, definition) => {
  try {
    return mongoose.model(name)
  } catch(error) {
    return mongoose.model(name, definition)
  }
}

let isConnected = false
export const connect = async () => {
  if (isConnected) {
    console.log('> Using existing database connection')
    return
  }

  await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  isConnected = true
}

export const User = liveModel('User', {
  name: {
    type: String,
    default: 'No-Name'
  },
  username: {
    type: String,
    unique: true
  }
})

export const List = liveModel('List', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  sharingId: String,
  isPublic: Boolean
})

export const Card = liveModel('Card', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  items: [
    {
      key: String,
      value: String,
      type: {
        type: String,
        enum: types.map((type) => type.key)
      }
    }
  ]
})