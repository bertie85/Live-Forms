import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Question from "./components/question/Question";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: 1,
      questions: [<Question key={1} id={1}
        getFields={this.updateQuestionFields} />],
      questionFields: [],
    };
  }

  addNewQuestion = () => {
    const currentQuestion = this.state.currentQuestion + 1;

    this.setState({
      currentQuestion,
      questions: [...this.state.questions,
      <Question key={currentQuestion} id={currentQuestion} getFields={this.updateQuestionFields} />],
    });
  };

  removeLastQuestion = () => {
    // Remove last element
    this.state.questions.pop();

    // Update the question id
    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
    });
  };

  updateQuestionFields = (fields) => {
    // TODO: find out if the question is already in the set, and if it is, just
    // overwrite it's fields

    this.state.questionFields.map(questionDetails => {
      if (questionDetails.id === this.state.currentQuestion) {
        this.setState({
          questionFields: [{
            id: this.state.currentQuestion,
            fields: fields,
          }]
        });
      }
    });
  };

  submit = () => {
    console.log(this.state.questionFields)
    // console.log(this.state);
    // TODO: validate form
    // TODO: save values
  };

  render() {
    return (
      <div className="App">
        {/*<header className="App-header"></header>*/}

        {/* Page Title */}
        <div className={"add-new-form-title--wrapper"}>
          <h1 className={"add-new-form-title"}>New Form</h1>
        </div>

        {/* The form and it's mirror */}
        <div id={"save-extra-section"} className={"main"}>

          {/* Form */}
          <Title />

          {/* This container holds all the questions and their mirrors */}
          <div className={"add-new-extra-section-form--wrapper"}>
            <div className={"questions-wrapper"}>
              {this.state.questions}
            </div>
          </div>

          {/* Buttons section */}
          <div className={"question-button-group"}>
            {/* Remove question */}
            <div className={"remove-question-button-wrapper"}>
              <button className={"remove-question-button"}
                onClick={this.removeLastQuestion}
                hidden={this.state.currentQuestion === 1}>
                Remove question
              </button>
            </div>

            {/* Add new question */}
            <div className={"add-new-question-button-wrapper"}>
              <button className={"add-new-question-button"}
                onClick={this.addNewQuestion}>
                Add new question
              </button>
            </div>
          </div>

          {/* Submit form */}
          <div className={"save-extra-section-button-wrapper"}>
            <button className={"save-extra-section-button"}
              onClick={this.submit}>
              Save Form
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


/*
*
* TODO: Make the finished question collaps after adding a new one AND the ability to
* open them again if need editing
* TODO: add section title, note, etc. functionality
* TODO: add docblocks everywhere!
*
* TODO: show submit button only when filled the minimum fields
* TODO: minimum fields:
*  - question
*  - type
*  - name
*  - shortname
*
* When any of these are changed, check the other two, and if all of them are valid,
* show the submit button!
*
* */