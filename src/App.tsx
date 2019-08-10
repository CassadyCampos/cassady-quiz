import React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionStore from './Store/QuestionStore';

interface AppProps {
  questionStore: QuestionStore;
}

@inject("questionStore")
@observer
class App extends Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.questionStore.populateQuestions();
  }

  render() {
    return(
      <h1>Test return</h1>
    )
  }
}

export default App;
