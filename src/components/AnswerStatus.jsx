import React from "react"
import { X, Check } from "react-feather"

/**
 *
 * @param {*} props.correct -- Whether or not the answer is correct
 */

class AnswerStatus extends React.Component {
    render() {
        let correctRender = (
            <div>
                <Check stroke="green" />
            </div>
        )
        let incorrectRender = (
            <div>
                <X stroke="red" />
            </div>
        )

        return this.props.correct ? correctRender : incorrectRender
    }
}

export default AnswerStatus
