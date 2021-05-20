// server.js
const express = require("express");
const path = require("path");
const homeRouter = require("./routes/homeRouter");
const engineRouter = require("./routes/engineRouter");
const exploreRouter = require("./routes/exploreRouter");
const createRouter = require("./routes/createRouter");
const {Requests, RequestMethod} = require("./src/common/utility/requests/requests");
const Param = require("./src/common/utility/requests/param");
const welcomeRouter = require("./routes/welcomeRouter");

// Define Express App
const app = express();
app.use(homeRouter);
app.use(engineRouter);
app.use(exploreRouter);
app.use(createRouter);
app.use(welcomeRouter);

// Serve Static Assets

app.use("/public", express.static(path.join(__dirname, "public")));

// const headers = {
//     "content-type": "application/json",
// };

// const req = new Requests("https://reqres.in/api", headers);

// const param = new Param("page", "2");

// req.paramRequest("/users", [param], RequestMethod.GET)
//     .then((response) => {
//         console.log(JSON.stringify(response.data.data));
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server connected at:", PORT);
});
