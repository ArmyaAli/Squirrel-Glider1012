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

        // first remove all leaderboard entries and then update the leaderboard
        leaderboard.replaceChildren();
        // then populate
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
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `${username}=${score}`,
    }

    try {
        const response = await fetch(url, config);
        getLeaderboard();
        // console.log(response);
    } catch (err) {
        console.log(err);
    }
}