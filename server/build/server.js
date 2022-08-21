"use strict";
// This is a re-write of the original server, but in typescript
// We will also support TLS and then I can deploy this as well
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const startup_1 = require("./startup");
const server = https.createServer(startup_1.SERVER_OPTIONS, (request, response) => {
    const { method } = request;
    switch (method) {
        case "GET":
            // handleReadRequest(request, response);
            break;
        case "POST":
            // handleWriteRequest(request, response);
            break;
    }
});
server.listen(startup_1.SERVER_PORT, () => {
    console.log(`Listening on port ${startup_1.SERVER_PORT}!`);
});
