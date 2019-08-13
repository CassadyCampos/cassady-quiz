import * as React from "react";
import { Component } from "react";
import Question from "./Question";
import axios from "axios";
import "../css/Game.css";
import ParseHtmlEntity from "../Utility/HtmlEntityParser";

interface GameProps {
    domParserHtmlEntities: DOMParser
}

interface GameState {
  question: [
    {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }
  ];
  isLoaded: boolean;
  possibleAnswers: string[];
  selectedAnswer: string;
  answerConfirmed: boolean;
}

class Game extends Component<GameProps, GameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      question: [
        {
          category: "",
          type: "",
          difficulty: "",
          question: "",
          correct_answer: "",
          incorrect_answers: []
        }
      ],
      isLoaded: false,
      possibleAnswers: [],
      selectedAnswer: "",
      answerConfirmed: false,
    };
  }

  componentDidMount() {
    this.populateQuestions();
  }
  populateQuestions() {
    axios.get(`https://opentdb.com/api.php?amount=1`).then(res => {
      let question = res.data.results;
      this.setState({
        question: question
      });
      this.setState({});
      this.populatePossibleAnswers();
      this.shufflePossibleAnswers();
    });
  }

  populatePossibleAnswers() {
    this.setState({
      possibleAnswers: [this.state.question[0].correct_answer]
    });
    this.state.question[0].incorrect_answers.forEach(answer => {
      this.setState({
        possibleAnswers: [...this.state.possibleAnswers, answer]
      });
    });
  }

  renderQuestion() {
    const parser = this.props.domParserHtmlEntities;
    let oldString = this.state.question[0].question;
    const convertedString = ParseHtmlEntity(oldString, parser)

    return (
      <div>
        <h1 className="question-text">Here is your Question. . .</h1>
        <div>
          {/* <div className="question-text">{this.state.question[0].question}</div> */}
          <div className="question-text">{convertedString}</div>
        </div>
      </div>
    );
  }

  shufflePossibleAnswers() {
    let temp = this.state.possibleAnswers.slice();

    for (let i = temp.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    this.setState({ possibleAnswers: temp });
  }

  selectAnswer(selectedAnswer: string) {
      if (!this.state.answerConfirmed) {
        this.setState({ selectedAnswer: selectedAnswer });
      }
  }

  confirmAnswer() {
    this.setState({ answerConfirmed: true });
  }

  renderPossibleAnswers() {
      const parser = this.props.domParserHtmlEntities;
      let convertedArray:string[] = [];
      this.state.possibleAnswers.forEach(oldString => {
          convertedArray.push(oldString);
      });
    return (
      <div className="possible-answers-list">
        {convertedArray.map(possibleAnswer => (
          <div
            className={this.state.selectedAnswer === possibleAnswer ? 'selected-answer': 'possible-answer'}
            onClick={() => this.selectAnswer(possibleAnswer)}
            key={this.state.possibleAnswers.indexOf(possibleAnswer)}>
            {ParseHtmlEntity(possibleAnswer, parser)}
          </div>
        ))}
      </div>
    );
  }

   renderAnswerDetails() {
      if (this.state.selectedAnswer === this.state.question[0].correct_answer) {
          return (
              <div>
              <div>CORRECT!</div>
            <button>Play Again!</button>
              </div>
          )
      }
      return(
        <div>
        <div>WRONG!</div>
      <button>Play Again!</button>
        </div>
      )
  }


  render() {
    return (
      <div className="game-container">
        {this.renderQuestion()}
        {this.renderPossibleAnswers()}
        {this.state.selectedAnswer !== '' ? 
        <div>
            <button onClick={() => this.confirmAnswer()}>Confirm Answer!</button>
        </div> : ''}
        {this.state.answerConfirmed ? this.renderAnswerDetails() : ''}
      </div>
    );
  }
}

export default Game;
