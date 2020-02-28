const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')


const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))



app.get()