import { readFile } from 'fs/promises';
import { config } from 'dotenv';

config();

let key = process.env.TLS_KEY_PATH;
let cert = process.env.TLS_CERT_PATH;
const port = process.env.PORT;

(async () => {
    key = (await readFile(key) as unknown) as string; 
    cert = (await readFile(cert) as unknown) as string; 
    console.log(key, cert)
})();

export const DB = process.env.FILE_PATH;

export const SERVER_OPTIONS = {
    key: key, 
    cert: cert
};

export const SERVER_PORT = port; 