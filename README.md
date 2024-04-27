# Memory Game

### Description
Forgetfulness is a plague that ruins the lives of many. It can be difficult to remember all the things you need to do, especially when you have a lot on your plate. Our memory game trains users in the art of memory so that they will never forget something again. Users face an ocean of tiles with hidden matching numbers. They flip over two tiles at a time to match them and try to match all tiles as fast as possible.

#### Pages
1. Login: Has the button to login the user using GitHub OAuth. Redirects the user to GitHub Login page and on success redirects back to the homepage.
2. Homepage: Displays the logged-in user's information and has buttons to redirect to the game page and logout.
3. Instructions: Provides the instructions on how to use the entire web application and displays images of the game.
4. Memory: Contains the logic for the memory game, selecting difficulty levels, and submits the score to the database
5. Leaderboard: Displays the scores of all the users according to their usernames and can reverse the scores.
6. Multiplayer: Allows two players to the play the game on the same board simultaneously using web sockets technology.

### Instructions
Users log in with GitHub and link their scores to their account. A leaderboard tracks users and their lowest times, so they can compete to have the best memory. The memory game has the difficulty level to set the board dimensions accordingly and clicking on the play button will start the game and the timer. The timer automatically stops and submits the score to backend when game completes.  

### Technologies
- We used React and Tailwind on the front-end to code the site and game.
- We used web sockets for multiplayer.
- We used Node.js and MongoDB on the back-end to store and retrieve scores.
- We used local storage, access tokens, authorization bearers, GitHub urls for routing between the web application and GitHub login page, React hooks and search params, and promises to authenticate users with GitHub.

### Challenges
- The initial challenge was to configure login with GitHub as we need to use local storage to determine if the user is logged-in in the frontend. In addition, there had to be made a few changes to the PassportJS logic to be able to authenticate the user using GitHub and route accordingly in the frontend using React.
- Setting the multiplayer using web sockets was challenging as need to configure graying out effect when a pair of tiles is matched for both the players and save the scores for both the players accordingly.
- Implementing a sorting algorithm to sort the scores and displaying data on the frontend in a table. In addition, need to filter out the data to display based on the difficulty level selected.
- Designing the logic and styling for the memory game had many sub-challenges:
  - Need to generate random numbers consecutively
  - Flip the tile to show the content
  - Flip back the pair of tiles when not matched or grey them out when matched
  - Terminate the timer when the game is completed
  - Setting the dimensions of the board dynamically according to the difficulty level selected by the user

### Contributions
1. Gabriel: Memory game, Readme, Presentation
2. Mike: Leaderboard, Multiplayer
3. Sai Teja: Login with GitHub authentication, Instructions page, Leaderboard, Readme 
4. Ronak: Database, Styling support, Presentation, Video Script
5. Klaudio: Memory game, Styling
- **Note:** All the members worked collaboratively by meeting at regular intervals and were involved in all the parts of the project.

### Accessibility Features
- We used ARIA labels to benefit the screen readers.
- Used a proper color scheme to make web application look elegant.
- Set the font sizes according to the purpose like the headings have a greater font-size for better visibility.
- Have a 90+% Google Lighthouse accessibility score.

