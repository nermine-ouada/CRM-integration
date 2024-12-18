const userRouter = require('./routes/userRoutes');

const companyRouter = require("./routes/companyRoutes");
const contactRouter = require("./routes/contactRoutes");

const dotenv = require("dotenv");
dotenv.config();
const { dbConnect } = require("./config/dbConnect");
dbConnect();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); 
//middlewares

app.use(express.json());
const cors = require("cors");
const leadRouter = require('./routes/leadRoutes');
app.use(cors());

app.use("/api/companies/", companyRouter);
app.use("/api/users/", userRouter);
app.use("/api/contacts/", contactRouter);
app.use("/api/leads/", leadRouter);

// Listen server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
