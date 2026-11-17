// ENV
require("dotenv").config();

//DNS
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// DB
const connectDB = require("./src/config/db");

//SERVER
const express = require("express");
const server = express();
const cors = require("cors");

// Errors

// Middlewares
const errorHandler = require("./src/middlwares/errorHandler");
const notFound = require("./src/middlwares/notFound");

// Routes
const auth = require("./src/routes/userRoute");
const category = require("./src/routes/categoryRoutes");
const product = require("./src/routes/productRoutes");
const ingredient = require("./src/routes/ingredients");
const inventory = require("./src/routes/transaction");

// Sync Import

const sync = require("./src/services/sync");

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Test
server.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Palermo API is running",
  });
});

server.use("/auth", auth);
server.use("/category", category);
server.use("/product", product);
server.use("/ingredient", ingredient);
server.use("/inventory", inventory);

// Syncronize changes

server.get("/sync", sync);

// 404 middleware
server.use(notFound);

// Error handler (must come after notFound)
server.use(errorHandler);

// Render and other hosting providers assign a port.
const PORT = process.env.PORT || 8080;
const RUN = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log("Server is running CHASE AND CATCH!");
    });
  } catch (err) {
    console.error(err);
  }
};
RUN();
