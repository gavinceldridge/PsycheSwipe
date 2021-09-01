"use strict";
require("colors");
// Express app for PsycheSwipe

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");

const authRoutes = require("./routes/auth");


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);



