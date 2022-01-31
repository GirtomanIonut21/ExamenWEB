const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/error')

// Routes
const meetings = require('./routes/meetings')
const participants = require('./routes/participants')

const app = express()

// Body parser
app.use(express.json())

// Enable CORS
app.use(cors())

app.use('/api/meetings', meetings)
app.use('/api/participants', participants)

app.use(errorHandler)

app.use(express.static('build'))

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, _ => {
  console.log(`Server running on port ${PORT}`)
})
