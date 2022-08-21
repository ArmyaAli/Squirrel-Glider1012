"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = exports.SERVER_OPTIONS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const key = process.env.TLS_KEY_PATH;
const cert = process.env.TLS_CERT_PATH;
exports.SERVER_OPTIONS = {
    key: key,
    cert: cert
};
exports.SERVER_PORT = process.env.PORT;
