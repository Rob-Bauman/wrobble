import { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import './App.css';
import WordRow from "./components/WordRow";
import useEventListener from "./hooks/UseEventListener";
import { checkWord } from "./api";

function App() {
  const validKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [guessWord, setGuessWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [success, setSuccess] = useState(false);
  const [layout, setLayout] = useState("default");
  const [eliminatedLetters, setEliminatedLetters] = useState([]);
  const [partiallyCorrectLetters, setPartiallyCorrectLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const keyboard = useRef();

  const handler = ({ key }) => {
    if (guessWord.length < 5) {
      if (eliminatedLetters.indexOf(key.toUpperCase()) === -1) {
        if ((key === "Backspace" || key === "{bksp}") && guessWord.length > 0) {
          setGuessWord(guessWord.slice(0, guessWord.length - 1));
        } else if (validKeys.indexOf(key.toUpperCase()) !== -1) {
          setGuessWord(guessWord + key.toUpperCase());
        }
      }
    } else if (guessWord.length === 5 && (key === "Enter" || key === "{enter}")) {
      check();
    }
  };

  useEventListener('keydown', handler);

  const check = () => {
    checkWord(guessWord).then(data => {
      setGuesses([...guesses, { word: guessWord, results: data }]);

      guessWord.split("").forEach((letter, index) => {
        if (data[index] === -1) {
          setEliminatedLetters(current => [...current, letter]);
        } else if (data[index] === 0) {
          setPartiallyCorrectLetters(current => [...current, letter]);
        } else if (data[index] === 1) {
          setCorrectLetters(current => [...current, letter]);
        }
      });

      setGuessWord("");

      if (data.indexOf(0) === -1 && data.indexOf(-1) === -1) {
        setSuccess(true);
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {guesses.map(guess => (
          <WordRow guess={guess} />
        ))}
        {!success && (
          <>
            <WordRow guess={{ word: guessWord, results: [] }} />
          </>
        )}
        <div className="keyboard-container">
          <Keyboard
            keyboardRef={r => (keyboard.current = r)}
            layoutName={layout}
            onKeyPress={key => handler({ key })}
            layout={{
              default: [
                "Q W E R T Y U I O P {bksp}",
                "A S D F G H J K L {enter}",
                "Z X C V B N M"
              ]
            }}
            buttonTheme={[
              {
                class: "eliminated-letter",
                buttons: eliminatedLetters.join(" ")
              },
              {
                class: "partially-correct-letter",
                buttons: partiallyCorrectLetters.join(" ")
              },
              {
                class: "correct-letter",
                buttons: correctLetters.join(" ")
              },
            ]}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
