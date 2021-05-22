/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        const phraseDIV = document.querySelector('#phrase ul');
        
        this.phrase.split('').forEach(word => {
            let li = document.createElement('li');
            
            if (word === ' ') {
                word = 'space';
                li.className = `hide ${word}`;
                li.innerHTML = ` `;
            } else {
                li.className = `hide letter ${word}`;
                li.innerHTML = `${word}`;
            };

            phraseDIV.appendChild(li);
        });
    };

    /**
     * Checks if passed letter is in phrase
     * @param (string) letter - Letter to check
     */
     checkLetter(letter) {
        return game.activePhrase.phrase.includes(letter);
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
     showMatchedLetter(letter) {
        const blockText = document.querySelectorAll('#phrase ul li');
        
        game.activePhrase.phrase.split('').forEach((word, index) => {
            if (game.activePhrase.checkLetter(letter) && blockText[index].textContent === letter) {
                blockText[index].className = 'show';
            };
        });
    };
}