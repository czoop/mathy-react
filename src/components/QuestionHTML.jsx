import React from "react"

let centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
}

let QuestionHTML = props => {
    return (
        <div style={centerStyle}>
            <h2>Question {props.id}</h2>

            <div
                style={centerStyle}
                dangerouslySetInnerHTML={{
                    __html: props.question_html,
                }}
            />
        </div>
    )
}

export default QuestionHTML
