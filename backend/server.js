import "dotenv/config";
import express from "express";
import connectDb from "./config/mongodb.js";
import adminRouter from "./routes/adminRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/book", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
