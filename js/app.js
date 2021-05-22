/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
const btnReset = document.getElementById('btn__reset');
const keyboard = document.querySelector('#qwerty');
const buttons = document.querySelectorAll('#qwerty .keyrow button');



btnReset.addEventListener('click', () => {
    game = new Game();
    game.startGame();
})


/**
 * Event listener to allow the user select words with clicks.
 */
 keyboard.addEventListener('click', (e) => {

    for (const button in buttons) {
        if (e.target === buttons[button]) {
            game.handleInteraction(e.target);
        };
    };
});

/**
 * Event listener to allow the user select words with keyboard.
 */
window.addEventListener('keydown', (e) => {

    [...buttons].forEach(button => {
        if (e.key === button.textContent && button.disabled === false) {
            if (!game.checkForWin() && game.missed <= 5) {
                game.handleInteraction(button);
            };
        };
    });
});