// This will just be a simple server code
// I do not want to use any type of framework like express because I think it's overkill for the usecase of a very simple leaderboard
// we will use the built in http module for node and intercept a HTTP GET
// We will also not utilize a database because then we have to deal with a database engine, a database interface that interops with node, a database manager/viewer as well...
// Instead for our persistant storage for the leaderboard we can use File I/O with a textfile or a binary file. Textfile would work just fine
// Every line on the textfile will be a leaderboard submission with a name and a score 
// Can parse each line and can split the line on a regex r"[ \t]+" like this