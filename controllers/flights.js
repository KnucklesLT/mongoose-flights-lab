import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function index(req, res) {
  const today = new Date()

  Flight.find({}).sort({ departs : 1})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/index')
  })
}


function newFlight(req,res){
  const flightNew = new Flight()
  const dt = flightNew.departs

  const departsDate = dt.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}


function create(req,res){
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}


function show(req,res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight:flight,
        meals: meals
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function deleteFlight(req,res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}


function edit(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    const dt = flight.departs
    const departsDate = dt.toISOString().slice(0,16)

    res.render('flights/edit', {
      title:'Edit Flight',
      flight:flight,
      departsDate: departsDate
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}


function update(req,res) {
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/')
  })
}


function createTicket(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}


function deleteTicket(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.remove(req.params.ticketid)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/flights/`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/flights/`)
  })
}

function addToMeals(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}


function deleteMeal(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.remove(req.params.mealid)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/flights/`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/flights/`)
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  edit,
  deleteFlight as delete,
  update,
  createTicket,
  deleteTicket,
  addToMeals,
  deleteMeal,
}