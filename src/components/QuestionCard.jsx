import React from "react"
import "./QuestionCard.css"
import QuestionHTML from "./QuestionHTML"
import AnswerInput from "./AnswerInput"

class QuestionCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            html: "<h1>Waiting For Question</h1>",
            answers: [],
            answer_input: "",
            correct: false,
            questions_completed: [],
        }
    }

    componentDidMount() {
        // Import the questions that are already completed
        let completed = localStorage.getItem("completed")
        completed = JSON.parse(completed)
        if (completed) {
            this.setState({ questions_completed: completed })
        }

        this.next_question()

        if (this.mathJaxReady()) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub])
        }
    }

    componentDidUpdate() {
        if (this.mathJaxReady()) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub])
        }
    }

    mathJaxReady() {
        return "MathJax" in window && "Hub" in window.MathJax
    }

    handleInput = event => {
        let input = event.target.value

        this.setState({ answer_input: input })

        this.checkAnswer(input)

        if (this.mathJaxReady()) {
            let answer_preview = window.MathJax.Hub.getAllJax("answer_preview")[0]
            window.MathJax.Hub.Queue(["Text", answer_preview, input])
        }
    }

    checkAnswer = input => {
        if (this.state.answers.includes(input)) {
            this.setState((state, props) => {
                let completed = state.questions_completed.concat([state.id])
                localStorage.setItem("completed", JSON.stringify(completed))
                return {
                    correct: true,
                    questions_completed: completed,
                }
            })
        } else {
            this.setState({ correct: false })
        }
    }

    get_question = async () => {
        this.reset_card()
        console.log("Getting questions")
        const res = await fetch(`/question?completed=${this.state.questions_completed.concat(this.state.id)}`)
        console.log(res)
        return res.json()
    }

    next_question = () => {
        this.get_question().then(json => {
            console.log(json)
            this.setState(json)
        })
    }

    reset_card = () => {
        this.setState({ answer_input: "", correct: false })

        if (this.mathJaxReady()) {
            let answer_preview = window.MathJax.Hub.getAllJax("answer_preview")[0]
            window.MathJax.Hub.Queue(["Text", answer_preview, ""])
        }
    }

    render = () => {
        return (
            <div className="card">
                <QuestionHTML id={this.state.id} question_html={this.state.html} />
                <AnswerInput handleInput={this.handleInput} answer_input={this.state.answer_input} correct={this.state.correct} />
                <button onClick={this.next_question} style={{ marginTop: "1rem" }}>
                    Next Question
                </button>
            </div>
        )
    }
}

export default QuestionCard
