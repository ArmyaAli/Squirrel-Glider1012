import { writeFile, readFile } from "fs/promises";
import { DB } from "./startup";

const readFromFile = async() => {
    let leaderboard = [];

    try {
        const buffer = await readFile(DB, { encoding: "utf-8" });

        if (buffer === "")
            return [];

        const lines = buffer.split("\n");

        for (const line of lines) {
            const parts = line.split(/[ \t]+/);
            leaderboard.push([parts[0], parts[1]]);
        }

        leaderboard = leaderboard.sort((first, second) => {
            if (parseInt(first[1]) > parseInt(second[1]))
                return -1;
            else if (parseInt(first[1]) < parseInt(second[1]))
                return 1;
            else
                return 0;
        });

        return leaderboard;

    } catch (err) {
        console.log(`Error in Proc readFromFile: ${err}`);
    }


}

export const handleReadRequest = async(request: any, response: any) => {

    try {

        const leaderboard = await readFromFile();

        if (leaderboard === undefined)
            throw "No leaderboard data";

        response.setHeader('Access-Control-Allow-Origin', "*");
        // Tell the client we are sending json
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'MushroomApplePi'
        });

        // Send back our JSON
        response.write(JSON.stringify(leaderboard));
        response.end();

    } catch (err) {
        console.log(`Error in Proc handleReadRequest ${err}`);
        // Tell the client we are sending json
        response.setHeader('Access-Control-Allow-Origin', "*");

        response.writeHead(404, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'MushroomApplePi'
        });

        response.write(JSON.stringify({ data: "none" }));
        response.end();
    }
}

export const handleWriteRequest = async(request: any, response: any) => {
    let body = "";

    request.on('data', (chunk: any) => {
        body += chunk.toString();
    }).on('end', async() => {
        try {

            const data = JSON.parse(body);

            let leaderboard = await readFromFile();

            leaderboard.unshift([data['name'], data['val']]);

            let buffer = "";

            leaderboard.forEach((pair) => {
                buffer += `${pair[0]}\t${pair[1]}\n`;
            });

            writeFile(DB, buffer.trimEnd());
            // Tell the client we are sending json
            response.setHeader('Access-Control-Allow-Origin', "*");

            response.writeHead(200, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'MushroomApplePi'
            });
            response.write(JSON.stringify({ data: "success" }));
            response.end();

        } catch (err) {
            console.log(`Error in Proc handleWriteRequest ${err}`);

            response.setHeader('Access-Control-Allow-Origin', "*");

            response.writeHead(404, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'MushroomApplePi'
            });
            response.end();
        }
    });
}