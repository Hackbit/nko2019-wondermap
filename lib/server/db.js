import mongoose from 'mongoose'
import types from '../shared/types'

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
})

const liveModel = (name, definition) => {
  try {
    return mongoose.model(name)
  } catch(error) {
    return mongoose.model(name, definition)
  }
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
  public: Boolean
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