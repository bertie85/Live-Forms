import React from 'react';

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enterPressed: false,
      title: ""
    };

    // Bind to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleClick(e) {
    // it can be an h2
    // it can be a span
    // how do i check against this? if it's an input or a h2 or a span?
    // console.log(e.target)

    if (this.state.enterPressed && this.state.title !== "No title was entered. Click on this text to enter one.") {
      this.setState({
        enterPressed: false,
        inputValue: this.state.title,
      });
    }
    else {
      this.setState({ inputValue: "", enterPressed: false });
    }
  }

  handleEnter(e) {
    const code = e.keyCode || e.which;
    if (code === 13) {
      this.setState({
        enterPressed: true,
        title: e.target.value ? e.target.value : "No title was entered. Click on this text to enter one.",
      });
    }
  }

  handleOnBlur(e) {
    this.setState({
      enterPressed: true,
      title: e.target.value ? e.target.value : "No title was entered. Click on this text to enter one.",
    });
  }

  render() {
    return this.state.enterPressed === false ?
      <div className={"section-form-title"}>
        <input type={"text"} id={"form-title"}
          defaultValue={this.state.inputValue}
          onClick={this.handleClick}
          onKeyPress={this.handleEnter}
          onBlur={this.handleOnBlur}
          placeholder={"Click here to enter a title"} />
      </div>
      :
      <div className={"section-form-title"}>
        <h2 onClick={this.handleClick}>
          <span className={"capitalise"}>
            {this.state.title}
          </span>
        </h2>
      </div>;
  }
}

export default Title;
