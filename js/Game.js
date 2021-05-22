/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
     createPhrases() {
        const phrasesObj = [
            new Phrase('Life is like a box of chocolates'),
            new Phrase('Life is beautiful'),
            new Phrase('Coffee is life'),
            new Phrase('Programing is life'),
            new Phrase('There is no Trying'),
        ];
        
        return phrasesObj;
    };


    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
     getRandomPhrase() {
        const randomNum = Math.floor( Math.random() * this.phrases.length);
        const phraseObj = this.phrases[randomNum];
        return phraseObj;
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const blockTextArray = [...document.querySelectorAll('#phrase ul li')];
        const filterText = [...blockTextArray].filter(text => {
            return text.className === 'hide space' ? false : true;
        });
       
       for (const li in filterText) {
           while (filterText[li].className !== 'show') {
               return false;
           };
       };
       return true;
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
     removeLife() {
        const heart = document.querySelectorAll('.tries img');
        
        if (this.missed < heart.length) {
            heart[this.missed].src = 'images/lostHeart.png';
        };
        
        this.missed += 1;
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
     gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        const h1 = document.querySelector('#overlay h1');

        if (!gameWon) {
            overlay.className = 'lose';
            overlay.style.display = 'flex';
            h1.innerHTML = 'Sorry, better luck next time!';
        } else {
            overlay.className = 'win';
            overlay.style.display = 'flex';
            h1.innerHTML = 'Great job!';
        };
    };

    

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
     handleInteraction(button) {
        button.disabled = true;

        if (!game.activePhrase.checkLetter(button.textContent)) {
            button.className = 'wrong';
            game.removeLife();
        } else {
            button.className = 'chosen';
            game.activePhrase.showMatchedLetter(button.textContent);
        };

        game.resetPage(button);
    };

    /**
     * This method will reset all the page when the start button after 
     * lost or win is clicked.
     */
     resetPage(letter) {
        let ulPhraseChild = document.querySelector('#phrase ul li');

        const ulPhrase = document.querySelector('#phrase ul');
        const qwerty = document.querySelectorAll('#qwerty .keyrow button');
        const hearts = document.querySelectorAll('.tries img');

        if (game.checkForWin() && game.activePhrase.checkLetter(letter.textContent)) {
            game.gameOver(true);
            qwerty.forEach(button => {
                button.className = 'key';
                button.disabled = false;
            });
            hearts.forEach(heart => heart.src = 'images/liveHeart.png');

            for (const li in ulPhrase) {
                while (ulPhraseChild) {
                    ulPhrase.removeChild(ulPhraseChild);
                    ulPhraseChild = document.querySelector('#phrase ul li');
                };
            };
        };
        
        if (this.missed === 5) {
            game.gameOver(false);
            qwerty.forEach(button => {
                button.className = 'key';
                button.disabled = false;
            });
            hearts.forEach(heart => heart.src = 'images/liveHeart.png');
            
            for (const li in ulPhrase) {
                while (ulPhraseChild) {
                    ulPhrase.removeChild(ulPhraseChild);
                    ulPhraseChild = document.querySelector('#phrase ul li');
                };
            };
        };
    };
}