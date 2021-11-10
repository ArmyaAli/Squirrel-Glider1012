export const getLeaderboard = async () => {
    const leaderboard = document.querySelector(".leaderboard>ol");
    let request = new Request("http://localhost:8080");
    
    const response = await fetch(request);
    let data = await response.json();
    // for (const username of Object.keys(data)) {
    //     console.log(`${username}: ${data[username]}`);
    // }

    for (const username of Object.keys(data)) {
        const item = document.createElement('li');
        item.textContent = `${username}: ${data[username]}`;
        leaderboard.appendChild(item);
    }
}


