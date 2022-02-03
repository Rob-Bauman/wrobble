import { useState } from "react";

const Letterbox = ({ letter, correctness = -1 }) => {
    let color = "";
    let textColor = "white";
    if (correctness === 0) {
        color = "yellow";
        textColor = "black";
    } else if (correctness === 1) {
        color = "green"
    }

    return (
        <span style={{ margin: "0 5px", padding: "5px", display: "inline-block", lineHeight: "50px", height: "50px", width: "50px", borderRadius: "5px", border: "thin solid white", color: textColor, backgroundColor: color }}>
            {letter}
        </span>
    );
};

export default Letterbox;