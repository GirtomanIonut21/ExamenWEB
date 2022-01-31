const express = require('express')
const {
  getMeetings,
  getMeeting,
  addMeeting,
  updateMeeting,
  deleteMeeting
} = require('../controllers/meetings')

const router = express.Router({ mergeParams: true })

router.route('/')
  .get(getMeetings)
  .post(addMeeting)

router.route('/:id')
  .get(getMeeting)
  .put(updateMeeting)
  .delete(deleteMeeting)

module.exports = router