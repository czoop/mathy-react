const express = require("express")
const app = express()

const questions = require("./questions")

/*

Expected Request Schema
Query Params:
completed: [] -- A list of all the completed question ids

*/

app.get("/question", (req, res) => {
    let completed = req.query.completed ? req.query.completed : []

    console.log(`Completed: ${completed}`)

    if (completed) {
        // questions.find(q => console.log(q.id.toString() === requested_id))
        let filtered_questions = questions.filter(q => !completed.includes(q.id.toString()))
        //let question = questions.find(q => q.id.toString() === requested_id)
        if (filtered_questions.length !== 0) {
            let question = filtered_questions[Math.floor(Math.random() * filtered_questions.length)]
            console.log("Sending question: ", question)
            res.json(question)
        } else {
            console.log("All questions completed!")
            res.json({ id: 0, html: "<h1>You're all Done!</h1>", answer: "" })
        }

        // console.log(`Sending Question ${question}`)
        // res.json(question)
    } else {
        res.status(400).json({ html: "<h1>ERROR</h1>" })
    }

    // console.log("Got a Request!")
    // let question = questions[Math.floor(Math.random() * questions.length)]
    // console.log("Sending question: ", question)
    // res.json(question)
})

app.listen(8080, () => {
    console.log("Server is listening")
})
