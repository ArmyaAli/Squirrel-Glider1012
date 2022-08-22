// This is a re-write of the original server, but in typescript
// We will also support TLS and then I can deploy this as well

import * as https from 'https';
import { handleReadRequest, handleWriteRequest } from './api';
import { SERVER_OPTIONS, SERVER_PORT } from './startup';

const server = https.createServer(SERVER_OPTIONS, (request, response) => {
    const { method } = request;
    switch (method) {
        case "GET":
            handleReadRequest(request, response);
            break;
        case "POST":
            handleWriteRequest(request, response);
            break;
    }

});

server.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}!`);
});
