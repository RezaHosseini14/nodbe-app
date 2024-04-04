const Application = require("./app/server");
require("dotenv").config();
let DB_URL = process.env.DATABASE_URL;
 if (process.env.NODE_ENV === "development") {
   DB_URL = "mongodb://127.0.0.1:27018/nodbe";
 } else {
   DB_URL = process.env.DATABASE_URL;
 }

new Application(3000, DB_URL);
