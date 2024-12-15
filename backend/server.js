const userRouter = require('./routes/userRoutes');
const companyRouter = require("./routes/companyRoutes");

const dotenv = require('dotenv');
dotenv.config();
const {dbConnect} = require('./config/dbConnect');
dbConnect();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); 
//middlewares
app.use(express.json());
const cors = require("cors");
app.use(cors());

//routes
app.use('/api/companies',companyRouter);
app.use('/api/users',userRouter);




 
//listen server
const PORT = process.env.PORT||3000;
app.listen(PORT,console.log(`server is running on ${PORT}`))
