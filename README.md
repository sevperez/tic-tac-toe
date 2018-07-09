# Impossible Tic-Tac-Toe

A game of impossible tic-tac-toe. For use only if you're OK with never winning. :unamused:

### Instructions
1. Clone locally using `git clone https://github.com/sevperez/tic-tac-toe.git`
2. Navigate into the `impossible-ttt` directory.
3. Install dependencies using `npm install`
4. Run tests with `npm test`
5. Start using `npm start`

### Tech Stack
- **Front-end view layer and application logic:** React.js
- **Front-end state management:** Redux.js
- **Persistence layer:** localStorage API
- **CSS Framework:** Bootstrap v4
- **Utility library:** Lodash
- **Testing libraries:** Enzyme and Jest
- **Development logging:** redux-logger

### Usage
- Start a new game by selecting the number of rounds, starting player, and your preferred token.
- After selecting your settings, hit "play" to begin a game.
- Game ends when the specified number of rounds have been completed.
- Round history is provided below the game board.
- Game history is provided below round history.
- Game history may be reset using the accompanying "reset" button.

### Computer AI
The computer AI is designed to ensure that every game results in either a win for the computer or a draw. In order to achieve this goal, it uses the minimax algorithm to evaluate all potential moves and assign each a positive, negative, or neutral value based on whether the move will result in a computer win, human win, or draw. The computer then chooses a move that will ensure it either wins (ideally) or draws (at worst).

### Future Tasks
The current implementation would benefit from several improvements, including the AI algorithm improvement noted above. In addition, next steps include improvement of the UI and overall user experience as well as more options to understand what strategy the computer is using. Currently, the persistence layer is in localStorage; however, the API has been designed so that this could easily be ported to a more permanent and portable database solution.
