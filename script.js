const wordEl = document.getElementById('word');
const wrongLetersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


//show the hidden word
function displayWord() {
    //set the innerHTML of the wordEl to the selected word
    wordEl.innerHTML = ` 
        ${selectedWord
            //split it into an array
            .split('')
            //map through said array
            .map(letter => 
                //check if the letter is included in that array. If it is, output the letter
                // if it isnt, return an empty string
                `<span class=letters>
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>`).join('')} 
  `;// turn it back into a string with .join()

  const innerWord = wordEl.innerText.replace(/\n/g,'');
  //console.log(wordEl.innerText, innerWord)
  if(innerWord == selectedWord){
      finalMessage.innerText =  'Congratulations! You won!';
      popup.style.display = 'flex';
  }
}

displayWord();