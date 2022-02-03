import Letterbox from "./Letterbox";

const WordRow = ({ guess }) => {
    return (
        <div style={{ height: "62px", display: "flex", marginBottom: "10px" }}>
            <Letterbox letter={guess.word[0]} correctness={guess?.results[0]}/>
            <Letterbox letter={guess.word[1]} correctness={guess?.results[1]}/>
            <Letterbox letter={guess.word[2]} correctness={guess?.results[2]}/>
            <Letterbox letter={guess.word[3]} correctness={guess?.results[3]}/>
            <Letterbox letter={guess.word[4]} correctness={guess?.results[4]}/>
        </div>
    );
};

export default WordRow;