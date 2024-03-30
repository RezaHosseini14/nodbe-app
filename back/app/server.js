const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const { AllRoutes } = require("./routers/router");
const cors = require("cors");
// const schedule = require("node-schedule");

module.exports = class Application {
  #app;
  // canRunScheduleFn;
  constructor(PORT, DB_URL) {
    this.#app = express();
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
    // this.canRunScheduleFn = true;
    // this.schedule();
  }

  configApplication() {
    const path = require("path");

    const corsOptions = {
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // متد‌های مجاز
      credentials: true, // اجازه ارسال کوکی‌ها
      preflightContinue: false, // غیرفعال کردن پاسخ‌های OPTIONS پیش‌زمینه
      optionsSuccessStatus: 204, // موفقیت کد برای پاسخ‌های OPTIONS
    };

    this.#app.use(cors(corsOptions));
    // if (process.env.NODE_ENV == "development") {
    //   this.#app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
    // } else {
    //   this.#app.use(cors({ credentials: true, origin: "https://nodbe-front.liara.run" }));
    // }
    this.#app.use(cookieParser());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }

  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`Server run on http://localhost:${PORT}`);
    });
  }

  configDatabase(DB_URL) {
    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("connect to mongoDB");
      })
      .catch((err) => {
        console.log("faild to connect mongoDB");
      });
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "صفحه مورد نظر یافت نشد",
      });
    });
    this.#app.use((err, req, res, next) => {
      const status = err?.status || 500;
      const message = err?.message || "InternalServerError";
      return res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }

  createRoutes() {
    this.#app.get("/", (req, res, next) => {
      res.json({
        message: "slam",
      });
    });
    this.#app.use(AllRoutes);
  }

  // scheduleCallback = (fireDate) => {
  //   const options = { day: "numeric", timeZone: "Iran" };
  //   const nowDay = parseInt(new Date().toLocaleDateString("fa-IR-u-nu-latn", options));
  //   if (nowDay === 8 && this.canRunScheduleFn) {
  //     this.canRunScheduleFn = false;
  //     console.log("function executed at: " + nowDay);
  //   } else if (nowDay !== 8) {
  //     this.canRunScheduleFn = true;
  //     console.log("not yet day is: " + nowDay);
  //   }
  // };
  // schedule() {
  //   const job = schedule.scheduleJob({ rule: "0 6 1 * *" }, this.scheduleCallback);
  // }
};
