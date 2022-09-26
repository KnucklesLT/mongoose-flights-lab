import { Flight } from "../models/flight.js"

function index(req, res) {
  const today = new Date()

  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights,
      isPast: flights.departs < today,
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
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}


function show(req,res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight',
      flight:flight
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

export {
  index,
  newFlight as new,
  create,
  show,
  edit,
  deleteFlight as delete,
  update,
  createTicket,
}