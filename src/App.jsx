import { useEffect } from "react"
import { useState } from "react"

function App() {
	const [letters, setLetters] = useState([])
	const [level, setLevel] = useState(1)
	const [wordArray, setWordArray] = useState([])
	const [anagramHidden, setAnagramHidden] = useState([])
	const [anima, setAnima] = useState(null)
	const word = [
		{
			word: 'COMPUTER',
			anagrams: [
				'COMPUTER',
				'COMPUTE',
				'TROUPE',
				'PRECUT',
				'CRUMP',
				'TRUMP',
				'CUTE',
				'COME',
				'CURE',
				'MUTE',
				'CORE',
				'PURE'
			]
		},
		{
			word: 'ALGORITHM',
			anagrams: [
				'ALGORITHM',
				'LOGARITHM',
				'ALRIGHT',
				'MORTAL',
				'MIGHT',
				'MORAL',
				'RIGHT',
				'LIGHT',
				'MATH',
				'GIRL',
				'MAIL',
				'GOAL'
			]
		},
		{
			word: 'DATABASE'
		},
		{
			word: 'SOFTWARE'
		}
	]

	const handleAddLetter = (letter) => {
		!letters.includes(letter) && setLetters(prev => [...prev, letter])
	}

	const handleRemoveLetter = (letterToRemove) => {
		setLetters(prev => prev.filter(letter => letter !== letterToRemove))
	}

	const handleRemoveAllLetter = () => {
		setLetters([])
	}

	const handleGuestWord = () => {
		if (anagramHidden.includes(letters.join(''))) {
			setAnima({ animation: 'correct 0.5s' })
			setTimeout(() => {
				setLetters([])
				setAnima({ animation: 'none' })
				setAnagramHidden(prev => prev.filter(anagram => anagram !== letters.join('')))
			}, 500);

			setTimeout(() => {
				anagramHidden.length == 1 && setLevel(prev => prev + 1)
			}, 1000);
		} else {
			navigator.vibrate(100)
			setAnima({ animation: 'shake 0.5s' })
			setTimeout(() => {
				setAnima({ animation: 'none' })
			}, 500);
		}
	}

	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const handleShuffle = () => {
		setWordArray(shuffle(word[level - 1].word.split('')))
	}

	useEffect(() => {
		setAnagramHidden([...word[level - 1].anagrams])
		setWordArray(shuffle(word[level - 1].word.split('')))
	}, [level])

	return (
		<div className="app">
			<h1>WORD GAME</h1>
			<h3>Level: {level}</h3>
			<div className="game-cont">
				<div className="hidden-words">
					{word[level - 1].anagrams.map((anagram, i) => <div key={i}>{anagram.split('').map((letter, i) => <h5 key={i}>{!anagramHidden.includes(anagram) && letter}</h5>)}</div>)}
				</div>
				<div className="letters-cont">
					<i className="fa-solid fa-trash" onClick={handleRemoveAllLetter} />
					<div className="letters">
						{letters.map((letter, i) => <h2 key={i} style={anima} onClick={() => handleRemoveLetter(letter)}>{letter}</h2>)}
					</div>
					<i className="fa-solid fa-check" onClick={handleGuestWord} />
				</div>
				<div className="word">
					<h1 onClick={handleShuffle}><i className="fa-solid fa-rotate" /></h1>
					{wordArray.map((letter, i) =>
						<h1
							className={letters.includes(letter) ? "active" : null}
							key={i}
							onClick={() => handleAddLetter(letter)}
						>
							{letter}
						</h1>)}
				</div>
			</div>
		</div>
	)
}

export default App
