import { readFileSync } from 'fs';
import { config } from 'dotenv';

config();

let key = "";
let cert = "";

(() => {
    key = (readFileSync(process.env.TLS_KEY_PATH) as unknown) as string; 
    cert = (readFileSync(process.env.TLS_CERT_PATH) as unknown) as string; 
    console.log("Hello World.\n");
    console.log(key, cert);
})();

export const DB = process.env.FILE_PATH;

export const SERVER_OPTIONS = {
    key: key, 
    cert: cert
};

export const SERVER_PORT = process.env.PORT; 