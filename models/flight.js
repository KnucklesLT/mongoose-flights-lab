import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American','Southwest','United', 'Delta', 'Jet Blue'],
  },

  airport: {
    type: String, 
    enum: ['AUS','DFW','DEN','LAX','SAN', 'JFK', 'LGA'],
    default: 'DEN',
  },

  flightNo: {
    type: Number,
    required: true,
    min:10,
    max:9999,
  },

  departs: {
    type: Date,
    default: function(){
      const date = new Date()
      const oneYearDate = new Date(date.getTime());
      oneYearDate.setFullYear(date.getFullYear() + 1)
      return oneYearDate
    }
  }
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}