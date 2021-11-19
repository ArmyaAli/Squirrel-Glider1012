// This will just be a simple server code
// I do not want to use any type of framework like express because I think it's overkill for the usecase of a very simple leaderboard
// we will use the built in http module for node and intercept a HTTP GET
// We will also not utilize a database because then we have to deal with a database engine, a database interface that interops with node, a database manager/viewer as well...
// Instead for our persistant storage for the leaderboard we can use File I/O with a textfile or a binary file. Textfile would work just fine
// Every line on the textfile will be a leaderboard submission with a name and a score 
// Can parse each line and can split the line on a regex r"[ \t]+" like this
// https://nodejs.org/es/docs/guides/anatomy-of-an-http-transaction/

const http = require('http');
const { readFile, writeFile } = require('fs/promises');

const PORT = 8080;
const DATABASE = "./server/leaderboard.txt";

const readFromFile = async() => {
    let leaderboard = [];

    const buffer = await readFile(DATABASE, { encoding: "utf-8", flag: "r" });

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


}

const handleReadRequest = async(request, response) => {

    try {

        const leaderboard = await readFromFile();

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
        console.log(err);
        // Tell the client we are sending json
        response.setHeader('Access-Control-Allow-Origin', "*");

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'MushroomApplePi'
        });

        response.write(JSON.stringify({ data: "none" }));
        response.end();
    }
}

const handleWriteRequest = async(request, response) => {
    let body = "";

    request.on('data', (chunk) => {
        body += chunk.toString();
    }).on('end', async() => {
        try {

            const data = JSON.parse(body);

            let leaderboard = await readFromFile();

            leaderboard.push([data['name'], data['val']]);

            leaderboard = leaderboard.sort((first, second) => {
                if (parseInt(first[1]) > parseInt(second[1]))
                    return -1;
                else if (parseInt(first[1]) < parseInt(second[1]))
                    return 1;
                else
                    return 0;
            });

            let buffer = "";

            leaderboard.forEach((pair) => {
                buffer += `${pair[0]}\t${pair[1]}\n`;
            });

            writeFile(DATABASE, buffer.trimEnd());
            // Tell the client we are sending json
            response.setHeader('Access-Control-Allow-Origin', "*");

            response.writeHead(200, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'MushroomApplePi'
            });
            response.write(JSON.stringify({ data: "success" }));
            response.end();

        } catch (err) {
            console.log(err)
            response.setHeader('Access-Control-Allow-Origin', "*");

            response.writeHead(200, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'MushroomApplePi'
            });
            response.end();
        }
    });
}

const server = http.createServer((request, response) => {
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

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})