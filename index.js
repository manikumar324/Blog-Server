const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require("./config/dbConfig")
const uploadRoutes = require('./routes/routes')


const app = express()
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use(uploadRoutes)

connectDB();

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server Running Successfully on PORT :- ${PORT}`))