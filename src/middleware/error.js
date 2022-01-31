const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    succes: false,
    error: error.message || 'Server error'
  })
}

module.exports = errorHandler