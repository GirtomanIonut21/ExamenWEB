const asyncHandler = require('../middleware/async')
const { Meeting, Participant } = require('../models')

exports.getMeetings = asyncHandler(async (req, res, next) => {
  const sortBy = req.query.sortBy;
  const sortDir = req.query.sortDir ?? 'ASC';

  const from = req.query.from ?? 0;
  const size = req.query.size ?? 25;

  const query = {
    offset: from,
    limit: size,
  };
  if (sortBy) {
    query.order = [
      [sortBy, sortDir],
    ]
  }

  const meetings = await Meeting.findAll(query);

  res.status(200).json({
    success: true,
    data: meetings
  })
})

exports.getMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByPk(req.params.id)

  res.status(200).json({
    success: true,
    data: meeting
  })
})

exports.addMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.create(req.body)

  res.status(201).json({
    success: true,
    data: meeting
  })
})

exports.updateMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByPk(req.params.id)
  if (!meeting) {
    return res.status(404).json({
      success: false,
    })
  }

  const [_, updatedMeeting] = await Meeting.update(req.body, {
    returning: true,
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({
    success: true,
    data: updatedMeeting
  })
})

exports.deleteMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByPk(req.params.id)
  if (!meeting) {
    return res.status(404).json({
      success: false,
    })
  }

  await meeting.destroy()

  res.status(200).json({
    success: true,
    data: {}
  })
})