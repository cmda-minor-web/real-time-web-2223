const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.get('/', (request, response) => {
  response.send('<h1>Hallo wereld! LOL</h1>')
})

http.listen(4242, () => {
  console.log('listening on 4242')
})