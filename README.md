<img width="200" align="left" style="float: left; margin: 0 10px 0 0;" alt="Karma" src="https://i.imgur.com/vIhdcHT.png"> 

![GitHub top language](https://img.shields.io/github/languages/top/finneh4249/pokerbo?color=0072CE&style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/finneh4249/pokerbo?style=for-the-badge)

This repository contains a JavaScript implementation of **PokerBo**, a unique and exciting casino game that blends elements of poker and sic bo. Originally created by Club Gaming Pty LTD (a subsidiary of Crown Casino), PokerBo was a popular table game at Crown Casino in Melbourne, Australia. Although the physical table was removed in 2021, this project brings the game back to life in a digital format.

### What is PokerBo?

PokerBo offers a thrilling gaming experience with no competition between players.  Instead, everyone focuses on the suspense of the draw, creating a sense of camaraderie as players anticipate the outcome of their wagers. With payouts ranging from 1:1 to 500:1, there's potential for big wins and exciting moments.

### Game Rules

  * **Decks:** Six standard decks of cards are used.

  * **Wagers:** Players can place bets on nine different outcomes:

      * **Straight 'n' Up:**  Pays based on the highest poker hand formed (e.g., Straight, Flush, Full House, etc.).
      * **Three of a Kind:** Pays 20:1 for three-of-a-kind (including hands that also qualify as a flush).
      * **Two Pair:** Pays 13:1 for two pairs (including hands that also qualify as a flush).
      * **Pair:** Pays 1:1 for a pair (including hands that also qualify as a flush).
      * **No Hand:** Pays if the highest hand is Ace-high or less.
      * **Specific Suit:** Four separate bets (Hearts, Clubs, Diamonds, Spades), each paying based on the number of cards of that suit in the final hand.
      * **Five of a Kind Flush:** Pays for a five-card straight flush.

  * **Gameplay:**

    1.  Players place their bets on any combination of wager types.
    2.  The dealer draws five cards from the shuffled deck and reveals them.
    3.  Winning wagers are determined based on the poker hands formed.

### How to Play this JavaScript Version

This repository provides the source code and documentation for running your own digital version of PokerBo.

To play this digital version of PokerBo, you'll need either of the following:
- **A code editor:** Any text editor will work, but a code editor with syntax highlighting for JavaScript is recommended, such as Visual Studio Code or Sublime Text.
- **A web server:** This JavaScript implementation of PokerBo runs in a static HTML file, and will work on any modern web browser. 

#### Steps to Play:

- Clone the repository:  Use Git to clone this repository to your local machine. Open your terminal or command prompt and navigate to the directory where you want to save the files. Then, run the following command:   

```bash
git clone https://github.com/finneh4249/pokerbo.git
```
Run the game:  Start the game server

This will launch the game, which you will be able to view in your web browser at your URL.

Place your bets:  Use the provided interface to place your wagers on the different outcomes.

Deal the cards:  Click "Place Bets" to reveal the five cards and see if you've won!**

### Features

  * **Authentic Gameplay:**  Faithfully recreates the rules and excitement of the original PokerBo game.

### Contributing

## Contributing to PokerBo

We welcome contributions from the community to help improve and expand this PokerBo project. Whether you're fixing bugs, adding features, or improving documentation, your contributions are valuable!

Here's how you can get involved:

**1.  Fork the Repository**

    *   Go to the [PokerBo repository](https://github.com/finneh4249/pokerbo) on GitHub.
    *   Click the "Fork" button in the top right corner to create your own copy of the repository.

**2.  Clone Your Fork**

    *   Open your terminal or command prompt.
    *   Navigate to the directory where you want to store the project.
    *   Clone your forked repository using the following command:

        ```bash
        git clone https://github.com/your-username/pokerbo.git
        ```

        Replace `your-username` with your actual GitHub username.

**3.  Create a Branch**

    *   Switch to the repository directory:

        ```bash
        cd pokerbo
        ```

    *   Create a new branch for your changes:

        ```bash
        git checkout -b descriptive-branch-name
        ```

        Choose a descriptive name for your branch that reflects the changes you plan to make (e.g., `fix-card-display-bug`, `add-gui`, `improve-readme`).

**4.  Make Changes**

    *   Make the desired changes to the code, documentation, or other files.
    *   Follow the existing code style and conventions.
    *   Write clear commit messages that explain your changes.

**5.  Test Your Changes**

    *   Thoroughly test your changes to ensure they work as expected and don't introduce new issues.
    *   If possible, add tests to cover your new code.

**6.  Commit and Push**

    *   Add the changed files:

        ```bash
        git add .
        ```

    *   Commit your changes with a descriptive message:

        ```bash
        git commit -m "Your detailed commit message"
        ```

    *   Push your changes to your forked repository:

        ```bash
        git push origin descriptive-branch-name
        ```

**7.  Create a Pull Request**

    *   Go to your forked repository on GitHub.
    *   Click the "New pull request" button.
    *   Select the original repository (`finneh4249/pokerbo`) as the base and your branch as the compare.
    *   Provide a clear title and description for your pull request, explaining the changes you've made.
    *   Click "Create pull request".

**8.  Review and Collaboration**

    *   The project maintainers will review your pull request.
    *   Be prepared to address any feedback or questions.
    *   Collaborate with the maintainers to make any necessary changes.

**Code Style Guidelines**

    *   Use clear and concise variable and function names.
    *   Indent code consistently (spaces are preferred).
    *   Add comments to explain complex logic or non-obvious code.
    *   Follow JavaScript best practices.


I appreciate your contributions and look forward to working with you to make this PokerBo project even better!


### License

This project is licensed under the [GPLv3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) License - see the [LICENSE](https://github.com/finneh4249/pokerbo/tree/main/LICENSE) file for details.
