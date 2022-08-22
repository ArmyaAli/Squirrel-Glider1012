import { readFile } from 'fs/promises';
import { config } from 'dotenv';

config();

let key = "";
let cert = "";

(async () => {
    key = (await readFile(process.env.TLS_KEY_PATH) as unknown) as string; 
    cert = (await readFile(process.env.TLS_CERT_PATH) as unknown) as string; 
    console.log("Hello World.\n");
    console.log(key, cert);
})();

export const DB = process.env.FILE_PATH;

export const SERVER_OPTIONS = {
    key: key, 
    cert: cert
};

export const SERVER_PORT = process.env.PORT; 