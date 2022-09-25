import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */
router.get('/', flightCtrl.index)

router.get('/new', flightCtrl.new)

router.get('/:id', flightCtrl.show)

router.get('/:id/edit', flightCtrl.edit)

router.post('/', flightCtrl.create)

router.delete('/:id', flightCtrl.delete)

router.put('/:id', flightCtrl.update)

export {
  router
}
