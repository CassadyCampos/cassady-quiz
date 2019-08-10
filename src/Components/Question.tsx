import * as React from 'react';
import { Component } from 'react';

interface QuestionProps {
    question: [{category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorect_answers: string[]
    }]
}

class Question extends Component<QuestionProps, {}> {
    render() {
        return(
            <div>
                <div>{this.props.question}</div>
                <div>{this.props.question[0]}</div>
            </div>
        )
    }
}

export default Question