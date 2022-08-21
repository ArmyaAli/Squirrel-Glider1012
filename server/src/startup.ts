import { readFile, writeFile } from 'fs/promises';
import {config} from 'dotenv';

config();

const key = process.env.TLS_KEY_PATH;
const cert = process.env.TLS_CERT_PATH;
const port = process.env.PORT;

export const SERVER_OPTIONS = {
    key: key, 
    cert: cert
};

export const SERVER_PORT = port; 