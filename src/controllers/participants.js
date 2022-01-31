const asyncHandler = require('../middleware/async')
const { Participant } = require('../models')

exports.getParticipants = asyncHandler(async (req, res, next) => {
  const participants = await Participant.findAll();

  res.status(200).json({
    success: true,
    data: participants
  })
})

exports.getParticipant = asyncHandler(async (req, res, next) => {
  const participant = await Participant.findByPk(req.params.id)

  res.status(200).json({
    success: true,
    data: participant
  })
})

exports.createParticipant = asyncHandler(async (req, res, next) => {
  const participant = await Participant.create(req.body)

  res.status(201).json({
    success: true,
    data: participant
  })
})

exports.updateParticipant = asyncHandler(async (req, res, next) => {
  const participant = await Participant.findByPk(req.params.id)
  if (!participant) {
    return res.status(404).json({
      success: false,
    })
  }

  const [_, updatedParticipant] = await Participant.update(req.body, {
    returning: true,
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({
    success: true,
    data: updatedParticipant
  })
})

exports.deleteParticipant = asyncHandler(async (req, res, next) => {
  const participant = await Participant.findByPk(req.params.id)
  if (!participant) {
    return res.status(404).json({
      success: false,
    })
  }

  await participant.destroy()

  res.status(200).json({
    success: true,
    data: {}
  })
})