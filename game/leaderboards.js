const url = "http://localhost:8080";

export const getLeaderboard = async() => {
    const leaderboard = document.querySelector(".leaderboard>ol");
    const config = {
        method: 'GET',
        cache: 'default'
    };

    try {
        const response = await fetch(url, config);

        const data = await response.json();
        console.log(data);

        // first remove all leaderboard entries and then update the leaderboard
        leaderboard.replaceChildren();
        // then populate
        for (const entry of data) {
            const item = document.createElement('li');
            item.innerHTML = `<span class='leaderboard-entry'>${entry[0]}<---->${entry[1]}</span>`;
            leaderboard.appendChild(item);
        }

    } catch (err) {
        console.log(err)
    }
}

export const sendScore = async(username, score) => {
    if (score === 0)
        return;

    const config = {
        method: 'POST',
        body: JSON.stringify({ name: username, val: score })
    }

    try {
        const response = await fetch(url, config);
        getLeaderboard();
    } catch (err) {
        console.log(err);
    }
}