import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

/* GET listing. */
router.get('/', flightCtrl.index)

router.get('/new', flightCtrl.new)

router.get('/:id', flightCtrl.show)

router.get('/:id/edit', flightCtrl.edit)

/* Post listing. */
router.post('/', flightCtrl.create)

router.post('/:id/tickets', flightCtrl.createTicket)


router.delete('/:id', flightCtrl.delete)

router.delete('/:id/tickets/:ticketid', flightCtrl.deleteTicket)

router.put('/:id', flightCtrl.update)

export {
  router
}
