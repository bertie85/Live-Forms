import React, {Component} from 'react';

class Mirror extends Component {

  handleClick = () => {
    this.props.update();
  };

  render() {
    const mirrorId = this.props.id;

    return (
      <div className={"mirror col"} id={mirrorId}>
        <div
          className={"question-number"}>
          {this.props.questionId}
        </div>

        {/* Name */}
        <MirrorQuestionText
          id={"mirror-question-name-" + mirrorId}
          text={this.props.questionText}
          required={this.props.required}
          inputLength={this.props.inputLength}/>

        {/* Type */}
        <MirrorType
          id={"mirror-question-type-" + mirrorId}
          inputElement={this.props.inputElement}/>

        {/* Help text */}
        <MirrorHelpText
          id={"mirror-question-help-text-" + mirrorId}
          text={this.props.helpText}/>

      </div>
    )
  }
}

class MirrorQuestionText extends Component {
  render() {
    const asterisk = this.props.text && "*";
    const length = this.props.inputLength && this.props.text && "(Max " + this.props.inputLength + " characters)";

    return (
      <div className={"mirror-question-text row"}>
        <h4 className={"col"}>{this.props.text}
          <span className={"col required-asterisk-" + this.props.required}>
            {asterisk}
          </span>
          <span className={"mirror-input-length"}>
            {length}
          </span>
        </h4>
      </div>
    );
  }
}

class MirrorType extends Component {
  render() {
    return (
      <div
        className={"mirror-question-input-type row"}>
        {this.props.inputElement}
      </div>
    );
  }
}

class MirrorHelpText extends Component {
  // TODO add proper help text icon and functionality
  render() {
    return (
      <div
        className={"mirror-question-helptext"}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default Mirror;
