const Application = require("./app/server");
// const DB_URL = process.env.DATABASE_URL;
const DB_URL = "mongodb://127.0.0.1:27018/nodbe";
require("dotenv").config();
new Application(3000, DB_URL);
