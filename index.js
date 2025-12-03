const words = [
  "bananas",
  "grapes",
  "carousel",
  "milkshake",
  "javascript",
  "limousine",
  "chocolate",
  "programming",
  "meatloaf",
  "ukulele",
  "mango",
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    let unguessedWord = "";
    let arrayUnguessed = [];
    this.letter = letter;
    //If letter is right, add to correctLetters
    //If letter is wrong, add to incorrectLetters
    if (this.word.includes(letter)) {
      //Add to correctLetters
      this.correctLetters.push(letter);
      if (this.word.includes(letter)) {
        for (let i = 0; i < this.word.length; i++) {
          if (this.correctLetters.includes(this.word[i])) {
            arrayUnguessed[i] = this.word[i];
            unguessedWord = arrayUnguessed.join("");
          } else {
            arrayUnguessed[i] = "_";
            unguessedWord = arrayUnguessed.join("");
          }
        }
      }
      this.displayWord = unguessedWord;
    } else {
      //Check if incorrectList array includes guess already
      if (this.incorrectLetters.includes(letter)) {
        return;
      } else {
        this.incorrectLetters.push(letter); //adds letter to incorrect list
        this.remainingGuesses -= 1; //lower guess counter
      }
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    let guesses = document.querySelector("#remaining-guesses");
    guesses.textContent = this.remainingGuesses;
    let incorrectGuesses = document.querySelector("#incorrect-letters");
    incorrectGuesses.textContent = this.incorrectLetters;
    let wordToGuess = document.querySelector("#word-to-guess");
    wordToGuess.textContent = this.displayWord;
  }

  // implement the isGameOver function:
  isGameOver() {
    //If guesses is less than or equal to 0, or word is displayword it is over
    if (this.remainingGuesses <= 0 || this.displayWord === this.word)
      return true;
    else return false;
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.word === this.displayWord && this.remainingGuesses > 0) {
      return "win";
    } else if (this.word !== this.displayWord && this.remainingGuesses <= 0) {
      return "loss";
    } else {
      return null;
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  currentWord = new Word(randomWord);
  currentWord.updateScreen();
}

document.onkeyup = function (e) {
  const pressedKey = e.key.toLowerCase();
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return;

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey);
  // allow word obj to update screen
  currentWord.updateScreen();

  // check if game is over
  const gameOver = currentWord.isGameOver();

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById("previous-word");
    const winDisplay = document.getElementById("wins");
    const lossDisplay = document.getElementById("losses");
    previousWord.textContent = currentWord.word;
    const result = currentWord.getWinOrLoss();
    if (result === "win") {
      wins++;
      winDisplay.textContent = wins;
    } else if (result === "loss") {
      losses++;
      lossDisplay.textContent = losses;
    }
    newGame();
  }
};

newGame();
