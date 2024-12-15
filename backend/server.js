const express = require("express");
const userRouter = require("./routes/userRoutes");
const companyRouter = require("./routes/companyRoutes");
const contactRouter = require("./routes/contactRoutes");

const dotenv = require("dotenv");
dotenv.config();
const { dbConnect } = require("./config/dbConnect");
dbConnect();
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/companies/", companyRouter);
app.use("/api/users/", userRouter);
app.use("/api/contacts/", contactRouter);

// Listen server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
