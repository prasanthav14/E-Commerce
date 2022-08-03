import 'dotenv/config'
import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import mysql from 'mysql2';
import mongoose from 'mongoose';
import cors from "cors";

import authrouter from "./routes/authrouter.js";
import itemrouter from "./routes/itemrouter.js";
import cartrouter from "./routes/cartrouter.js";
import payrouter from "./routes/payrouter.js";
import purchasehistoryrouter from "./routes/purchasehistoryrouter.js";


async function startServer() {
  await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      app.listen( process.env.PORT || 4000 , () => {
        console.log('Mongo and Server Started!');
      });
    })
    .catch(err => {
      console.log("error connect mongo or server");
      console.log(err);
    })
}
startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: { maxAge: 60 * 60 * 24 * 1000 }
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  "optionsSuccessStatus": 204
}))

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use("/auth", authrouter);
app.use("/item", itemrouter);
app.use("/cart", cartrouter);
app.use("/pay", payrouter);
app.use("/purchasehistory", purchasehistoryrouter);
app.get("/", (req, res) => {
  res.status(200).json({ "status": "server active" })
})
