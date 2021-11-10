// This will just be a simple server code
// I do not want to use any type of framework like express because I think it's overkill for the usecase of a very simple leaderboard
// we will use the built in http module for node and intercept a HTTP GET
// We will also not utilize a database because then we have to deal with a database engine, a database interface that interops with node, a database manager/viewer as well...
// Instead for our persistant storage for the leaderboard we can use File I/O with a textfile or a binary file. Textfile would work just fine
// Every line on the textfile will be a leaderboard submission with a name and a score 
// Can parse each line and can split the line on a regex r"[ \t]+" like this
// https://nodejs.org/es/docs/guides/anatomy-of-an-http-transaction/

const http = require('http');
const { readFile } = require('fs/promises');

const PORT = 8080;

const handleRead = async(response) => {
    // parse the textfile into a javascript object
    // return JSON back to the client
    const leaderboard = {};
    const buffer = await readFile('./server/leaderboard.txt', { encoding: "utf-8", flag: "r" });
    const lines = buffer.split("\r\n");

    for (const line of lines) {
        const parts = line.split(/[ \t]+/);
        leaderboard[parts[0]] = parts[1];
    }

    // Tell the client we are sending json
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'MushroomApplePi'
    });

    // Send back our JSON
    response.write(JSON.stringify(leaderboard));
}

const handleUpdate = async(data) => {
    // Read the entire text file into a buffer
    // Make a js object using the data
    // Add the 
}

const server = http.createServer((request, response) => {
    const { method, url } = request;
    const { headers } = request;

    switch (method) {
        case "GET":
            handleRead(response);
            break;
        case "POST":
            //handleWrite();
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})