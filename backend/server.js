"use strict";

const app = require("./app");
const { POST } = require("./config");

app.listen(PORT, () => {
    console.log(`Started on http://localhost:${POST}`);
});