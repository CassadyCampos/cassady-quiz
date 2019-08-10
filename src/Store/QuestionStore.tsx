import {observable, action} from 'mobx';
import axios from 'axios';


export default class QuestionStore {

    @observable
    questions: [] = [];

    @action
    populateQuestions() {
        axios.get(`https://opentdb.com/api.php?amount=10`)
        .then(res => {
            const questions = res.data.results;
            console.log(questions);
        })
    }

}