import * as React from 'react';
import { Component } from 'react';
import Question from './Question';
import axios from 'axios';


interface QuestionState  {
    question: [{
        category: string,
        type: string,
        difficulty: string,
        question: string,
        correct_answer: string,
        incorrect_answers: string[];
    }],
    isLoaded: boolean,
    possibleAnswers: string[]
}
class Game extends Component<{}, QuestionState> {
    constructor(props: any) {
        super(props);

        this.state = {
            question: [{category: '',
                type: '',
                difficulty: '',
                question: '',
                correct_answer: '',
                incorrect_answers: []
            }],
            isLoaded: false,
            possibleAnswers: []
        }
    }

    componentDidMount() {
        this.populateQuestions();
        // this.populatePossibleAnswers();
        // console.log(this.state.possibleAnswers);
    }
    // .replace(/'/g, "&#039;");
    populateQuestions() {
        axios.get(`https://opentdb.com/api.php?amount=1`)
        .then(res => {
            let question = res.data.results;
            console.log(question);
            this.setState({
                question: question
            })
            this.setState({
            })
            this.populatePossibleAnswers();
        })
    }

    populatePossibleAnswers() {
        console.log(this.state.question[0].correct_answer);
        console.log(this.state.question[0])
        console.log(this.state.question[0].incorrect_answers)
        this.setState({
            possibleAnswers: [this.state.question[0].correct_answer]
        })
        this.state.question[0].incorrect_answers.forEach(answer => {
            this.setState({
                possibleAnswers: [...this.state.possibleAnswers, answer]
            })
        })
    }

    renderQuestion() {
        return (
            <div>
                <h1>Here is your Question. . .</h1>
                <div>
                    <div>{this.state.question[0].question}</div>
                </div>

            </div>
        )
    }

    renderPossibleAnswers() {
        // console.log(this.state.possibleAnswers)

        return(
            <div>
                {this.state.possibleAnswers.map(possibleAnswer => 
                    <div>{possibleAnswer}</div>)}
            </div>
        )
    }

    render() {
        return(

            <div>
                {this.renderQuestion()}
                {this.renderPossibleAnswers()}
            </div>
        );
    }

}

export default Game;
