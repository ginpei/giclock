const express = require('express')
const app = express()

const PORT = 3000

app.use('/assets/', express.static('./build'))
app.use('/', express.static('./static'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
