const express = require("express");
const userRouter = require('./routes/userRoutes');
const companyRouter = require("./routes/companyRoutes");


const dotenv = require('dotenv');
dotenv.config();
const {dbConnect} = require('./config/dbConnect');
dbConnect();
const app = express();

//middlewares
app.use(express.json());

//routes
app.use('/api/companies/',companyRouter);
app.use('/api/users/',userRouter);



 
//listen server
const PORT = process.env.PORT||3000;
app.listen(PORT,console.log(`server is running on ${PORT}`))
