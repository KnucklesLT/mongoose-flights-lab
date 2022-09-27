import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String, 
    match: /[A-F][1-9]\d?/,
  },
  price: { 
    type: Number, 
    min: 0,
  }
}, {
  timestamps: true
})

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
  },

  tickets: [ticketSchema],
  meals:[{
    type: Schema.Types.ObjectId,
    ref: 'Meal'
  }]
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}