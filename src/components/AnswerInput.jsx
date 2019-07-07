import React from "react"
import AnswerStatus from "./AnswerStatus"

let singleLineStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5rem",
}

let AnswerInput = props => {
    return (
        <div>
            <div style={singleLineStyle}>
                Answer: <input onChange={props.handleInput} disabled={props.correct} value={props.answer_input} />
                <AnswerStatus correct={props.correct} />
            </div>

            {/* <div
                id="answer_preview"
                dangerouslySetInnerHTML={{ __html: "Answer Preview: `".concat(props.answer_input).concat("`") }}
            /> */}
            <div id="answer_preview">Answer Preview: `{props.answer_input}`</div>
        </div>
    )
}

export default AnswerInput
