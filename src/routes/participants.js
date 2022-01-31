const express = require('express')
const {
  getParticipants,
  getParticipant,
  createParticipant,
  updateParticipant,
  deleteParticipant
} = require('../controllers/participants')

const router = express.Router()

router.route('/')
  .get(getParticipants)
  .post(createParticipant)

router.route('/:id')
  .get(getParticipant)
  .put(updateParticipant)
  .delete(deleteParticipant)

module.exports = router;