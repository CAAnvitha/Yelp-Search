import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import businessRouter from './routers/business.js'
import formUtilRouter from './routers/formUtil.js'
import googleMapsRouter from './routers/google-maps.js'
//load .env and populate config in env
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors())

app.use('/businesses', businessRouter)
app.use('/form-util', formUtilRouter)
app.use('/google-maps', googleMapsRouter)

app.listen(PORT, function() {
    console.log("Backend Application listening at https://nodeproject098.wl.r.appspot.com/")
})