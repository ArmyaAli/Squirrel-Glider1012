const url = "http://localhost:8080";

export const getLeaderboard = async() => {

    const leaderboard = document.querySelector(".leaderboard>ol");

    let request = new Request(url);
    const config = {
        method: 'GET',
        cache: 'default'
    };

    try {
        const response = await fetch(request, config);

        const data = await response.json();

        for (const username of Object.keys(data)) {
            const item = document.createElement('li');
            item.textContent = `${username}: ${data[username]}`;
            leaderboard.appendChild(item);
        }

    } catch (err) {
        console.log(err)
    }
}

export const sendScore = async(username, score) => {
    // Example POST method implementation:
    let data = {};
    data[username] = score;
    console.log(username, score, data)
        // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    console.log(response.json()); // parses JSON response into native JavaScript objects

}