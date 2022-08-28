import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { exit } from 'process';

config();

const key_path = process.env.TLS_KEY_PATH;
const cert_path = process.env.TLS_CERT_PATH;


if(key_path === undefined || cert_path === undefined) 
    exit(1);

let key: Buffer  = readFileSync(key_path);
let cert: Buffer = readFileSync(cert_path);

export const DB = process.env.FILE_PATH;

export const SERVER_OPTIONS = {
    key: key, 
    cert: cert
};

export const SERVER_PORT = process.env.PORT; 