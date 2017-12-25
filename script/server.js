const express = require('express')
const app = express()

const PORT = 3000

app.use('/assets/app.js', express.static('./build/app.js'))
app.use('/', express.static('./static'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
