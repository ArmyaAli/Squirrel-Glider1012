import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { exit } from 'process';

config();

let key_path = process.env.TLS_KEY_PATH;
let cert_path = process.env.TLS_CERT_PATH;

let key: Buffer;
let cert: Buffer;

if(key_path === undefined || cert_path === undefined) 
    exit(1);

(() => {
    key = readFileSync(key_path); 
    cert = readFileSync(cert_path); 
})();

export const DB = process.env.FILE_PATH;

export const SERVER_OPTIONS = {
    key: key, 
    cert: cert
};

export const SERVER_PORT = process.env.PORT; 