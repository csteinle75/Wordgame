console.log(commonWords)

class Word {
	constructor(){
		this._word = "wordo"
	}
	get word(){
		return this._word
	}
}

class Hangman {
	constructor(){
		this._answer = new Word() //currently not random for testing purposes
		this._display = "_ _ _ _ _" // length of answer, joined by spaces, replace underscores when correct guess
		this._guesses = [] //guessed letters, alphabetize when displayed
		this._turns = 8 //starts at 8 and counts down
	}

	get answer(){
		return this._answer
	}
	get display(){
		return this._display
	}
	get displaySplit(){
		return this._display.split(" ")
	}
	get guesses(){
		return this._guesses.sort().join(" ")
	}
	get turns(){
		return this._turns
	}
	get word(){
		return this._answer.word
	}


	gamestate(){
		console.log('Answer: ' + this.word, " Display: " + this.displaySplit.join(''))
		if(this.turns >= 0 && this.word === this.displaySplit.join('')){
			$("#message").text('Winner')
		} else if (this.turns <= 0 && this.word !== this.displaySplit.join('')){
			$("#message").text('Loser')
		} else{
			$("#message").text('Keep Playing')
		}
	} //need to prevent play after completion

	guess(){
		//on button press get guess from input, then compare to answer. if match = true, modify display, either way modify guesses and turn count
		let guess = $('#guess').val().toLowerCase()
		this._guesses.push(guess)
		$("#guessedLetters").text(`Guessed letters: ${this.guesses}`)

		let tempArr = this.displaySplit
		let tempAnswer = this.word.split("")

		const replacer = () => {
			if (tempAnswer.indexOf(guess) !== -1){
				let index = tempAnswer.indexOf(guess)
				tempArr[index] = guess
				tempAnswer[index] = 0
				replacer()
			}
		}
		replacer()

		this._display = tempArr.join(" ")
		$("#mysteryWord").text(`${this.display}`)

		this._turns -= 1
		$("#turnCounter").text(`Guesses remaining: ${this.turns}`)
	}


}

var game = new Hangman();

$( document ).ready(function() {


	$('#submit').on('click', function(e){
		e.preventDefault()
		game.guess()
		game.gamestate()
	})
});


