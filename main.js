class Word {
	constructor(){
		this._word = function(){
			let filteredWords = commonWords.filter(word => word.length >= 3)
			let index = Math.floor(Math.random() * filteredWords.length)
			return filteredWords[index]
		}()
	}
	get word(){
		return this._word
	}
	get blanks(){
		let blankDisplay = []
		while(blankDisplay.length < this.word.length){
			blankDisplay.push('_')
		}
		return blankDisplay.join(" ")
	}
}

class Hangman {
	constructor(){
		this._answer = new Word() 
		this._display = this.answer.blanks // length of answer, joined by spaces, replace underscores when correct guess
		this._guesses = [] //guessed letters, alphabetize when displayed
		this._turns = 8 //starts at 8 and counts down
		this._status = 'playing' //
		
		$("#message").text('Guess a letter')
		$("#turnCounter").text(`Guesses remaining: ${this.turns}`)
		$('#mysteryWord').text(`${this.display}`)
		$("#guessedLetters").text(`Guessed letters: ${this.guesses}`)
	}

	get answer(){
		return this._answer
	}
	get newDisplay(){
		let blankDisplay = []
		while(blankDisplay.length < this.word.length){
			blankDisplay.push('_')
		}
		$('#mysteryWord').text(`${blankDisplay.join(" ")}`)
		return blankDisplay.join(" ")
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
	get status(){
		return this._status
	}


	gamestate(){
		console.log('Answer: ' + this.word, " Display: " + this.displaySplit.join(''))
		if(this.turns >= 0 && this.word === this.displaySplit.join('')){
			this._status = 'end'
			$("#message").text('Winner!')
			$("#gameContainer").append('<iframe width="0" height="0" src="https://www.youtube.com/embed/saCaZ3KvYgY?autoplay=1;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
		}
		if (this.turns <= 0 && this.word !== this.displaySplit.join('')){
			this._status = 'end'
			$("#message").text(`You Lost! The mystery word was '${this.word}.'`)
			$("#gameContainer").append('<iframe width="0" height="0" src="https://www.youtube.com/embed/09s-c2JVI40?autoplay=1;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
		} 
	} 

	guess(){
		//on button press get guess from input, then compare to answer. if match = true, modify display, either way modify guesses and turn count
		let guess = $('#guess').val().toLowerCase()
		if (this._guesses.indexOf(guess) > -1){
			$("#message").text('This letter has already been guessed!')
			$('#guess').val("")
			return;
		}
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

		$('#guess').val("")

		$("#message").text('Keep Playing')
	}


}

var game


$( document ).ready(function() {
	$('#newGame').on('click', function(e){
		e.preventDefault()
		game = new Hangman();
		$("iframe").remove()
	})

	$('#submit').on('click', function(e){
		e.preventDefault()
		if(game && game.status === 'playing'){
			game.guess()
			game.gamestate()
		} else{
			$("#message").text('Click the New Word button to start game')
		}
	})
});


