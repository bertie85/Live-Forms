import {Component, Fragment} from "react";
import React from "react";
import Label from "../../inputs/Label";
import Number from "../../inputs/Number"
import Text from "../../inputs/Text";
import Range from "../../inputs/Range";

class QuestionFieldSelectType extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownSelected: false,
    };

    // Bind to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  handleChange(e) {
    const option = e.target.value || e.which;

    this.setState({
      dropdownSelected: option === "SelectOne",
    });

    this.props.setMirrorValue(e);
  }

  updateOptions(originalId, options, key = false) {
    const e = {
      target: {
        id: "question-type-mirror-options--" + originalId, //TODO update id properly (I can get it from the props)
        key: key,
        value: "SelectOne",
        mirrorOptions: options,
      }
    };
    // debugger;
    this.props.setMirrorValue(e);
  }

  render() {
    const selectOptions = this.state.dropdownSelected &&
      <SelectTypeOptions id={this.props.id + "-secondary"}
                         setMirrorOptions={this.updateOptions}/>;

    return (
      <div className={"question--field-wrapper"}>

        {/* Label */}
        <Label idFor={this.props.id} text={this.props.label}/>

        <div className={"question--input-wrapper"}>
          <select className={"question--input"} id={this.props.id}
                  onChange={this.handleChange}>
            <option value={""}>- Select a type -</option>
            <option value={"Text"}>Text</option>
            <option value={"TextArea"}>Text area</option>
            <option value={"SelectOne"}>Drop down</option>
            <option value={"SelectMultiple"}>Checkboxes</option>
            <option value={"ChooseOne"}>Radio buttons</option>
            <option value={"Number"}>Number</option>
            <option value={"Datepicker"}>Date picker</option>
            <option value={"Fieldset"}>Fieldset</option>
            <option value={"Subtable"}>Subtable</option>
          </select>
        </div>
        {selectOptions}
      </div>
    )
  }
}

// TODO add ability to import predefined options in json format (fetch from db eg.) ?
// TODO add name that makes sense
// TODO save options from previous input when switching between checkboxes and drop down
class SelectTypeOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: null,
      showAdd: false,
      rangeInput: this.getRangeInput(),
    };

    // Bind to make 'this' work in the callback
    this.handleCustomEnter = this.handleCustomEnter.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleCustomEnter(e) {
    const code = e.keyCode || e.which;
    if (code === 13) {
      const options = [];
      const count = e.target.value || 0;

      // Use the Question Field Text class to present options
      // TODO at every change I need to send back options in the handlechange
      for (let i = 0; i < count; i++) {
        let j = i + 1;
        options.push(
          <Text label={"Option " + j}
                key={i}
                optionKey={i}
                id={"question-select-custom-option--" + this.props.id + "-" + i}
                getMirrorOption={this.handleChangeCustom}/>
        )
      }

      const input = options.length > 0 ?
        <fieldset className={"question--input-secondary"}
                  id={"fieldset-" + this.props.id}>
          {/* TODO add proper id */}
          {options}
        </fieldset> : null;

      this.setState({
        options: input,
      });

      // TODO I'll need to update the mirror from these inputs!!
      // this.props.setMirrorOptions(e.target.id, ['empty-mirror-options']);
    }
  }

  getRangeInput = () => {
    return <Range questionId={this.props.id}
                  handleChangeMain={this.handleChangeRange}/>;
  };

  handleChangeRange = (e, value) => {
    this.props.setMirrorOptions(e.target.id, [value]);
  };

  handleChangeCustom = (e, value, key) => {
    this.props.setMirrorOptions(e.target.id, [value], key);
  };

  handleRadio(e) {
    const value = e.target.value || e.which;
    let options = [];
    let displayOptions = null;

    switch (value) {
      case "range":
        displayOptions = this.state.rangeInput;
        options = [];
        break;

      case "months":
        options = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        break;

      case "week":
        options = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        break;

      case "custom":
        displayOptions = <Number
          className={"question--input-wrapper-secondary"}
          id={"question-field-number-of-options-" + this.props.id}
          label={"Number of options"}
          handleCustomNumber={this.handleCustomEnter}/>;

        options = []; // just always push the last option to the state property
        break;

      default:

    }

    this.setState({
      options: displayOptions,
      showAdd: true,
    });

    this.props.setMirrorOptions(e.target.id, options);
  };

  render() {
    const radioOptions = [
      "Week",
      "Months",
      "Range",
      "Custom",
    ];

    return (
      <div className={"question--field-wrapper-secondary"}>
        <div className={"question--field-wrapper-secondary--radios"}>

          {/* Loop through the radio options and generate the radio buttons */}
          {radioOptions.map((radioOption, index) => {
            const currentRadio = radioOption.toLocaleLowerCase();

            return (
              <div key={index}
                   className={"question--field-wrapper-secondary--radio"}>
                <div className={"radio-wrapper--label"}>
                  <label
                    htmlFor={"radio-" + currentRadio + "-" + this.props.id}>
                    {radioOption}
                  </label>
                </div>
                <div className={"radio-wrapper--input"}>
                  <input type={"radio"}
                         id={"radio-" + currentRadio + "-" + this.props.id}
                         name={"select-options-type" + this.props.id}
                         value={currentRadio}
                         onClick={this.handleRadio}/>
                </div>
              </div>
            )
          })}

        </div>

        {/* The fieldset itself */}
        <div className={"question--input-wrapper-secondary--options"}>
          {this.state.options}
        </div>
      </div>
    )
  }
}

export default QuestionFieldSelectType;