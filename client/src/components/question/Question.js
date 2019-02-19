import React, {Component} from 'react';
import Text from "../inputs/Text";
// import Number from "../inputs/Number";
import QuestionFieldSelectType from "./fields/QuestionFieldSelectType";
import QuestionFieldRequired from "./fields/QuestionFieldRequired";
import Mirror from "../mirror/Mirror";
import QuestionFieldLength from "./fields/QuestionFieldLength";
import Checkbox from "../inputs/Checkbox";
import Radio from "../inputs/Radio";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mirrorQuestion: "",
      mirrorInput: null,
      mirrorRequired: "hide",
      mirrorHelpText: "",
      mirrorLength: null,
      mirrorRangeStart: null,
      mirrorCustomOptions: [],
      lengthClass: "hidden",
    }
  }

  // TODO add and dedicate new function for every type of updated so we don't have
  // to go over this check every time a mirror value gets updated
  updateMirrorValues = (e) => {
    const targetId = e.target.id;
    const value = e.target.value || e.which;

    switch (true) {
      case targetId.includes("question-name-"):
        this.setState({
          mirrorQuestion: value,
        });
        break;

      case targetId.includes("question-required-"):
        this.setState({
          mirrorRequired: value === "true" ? "show" : "hide",
        });
        break;

      case targetId.includes("question-type-"):
        const input = this.getInputElement(value, e);

        this.setState({
          mirrorInput: input,
        });
        break;

      case targetId.includes("question-helptext-"):
        this.setState({
          mirrorHelpText: value,
        });
        break;

      case targetId.includes("question-field-length-"):
        this.setState({
          mirrorLength: value,
        });
        break;

      default:

    }
  };

  getInputElement = (value, e) => {
    switch (value) {
      case "Text":
        this.setState({
          lengthClass: "",
        });
        return <input type={"text"} className={"mirror-input-element"}/>;

      case "TextArea":
        this.setState({
          lengthClass: "",
        });
        return <textarea className={"mirror-input-element"} rows="4" cols="50">
              </textarea>;

      case "SelectOne":
        this.setState({
          lengthClass: "hidden",
        });

        let mirrorOptions = [];

        // Case when range selected and the first field has been populated
        if (e.target.id.includes("range-1")) {
          this.setState({
            mirrorRangeStart: e.target.mirrorOptions[0],
          });

          mirrorOptions = e.target.mirrorOptions;
        }
        // Case when range selected and the second field has been populated
        else if (e.target.id.includes("range-2")) {
          const start = +this.state.mirrorRangeStart;
          const end = +e.target.mirrorOptions[0];

          mirrorOptions = start && end ? this.calculateRangeOptions(start, end) : [];
        }
        // Case when custom is selected and a new field has been populated
        else if (e.target.id.includes("custom-option")) {
          // TODO I'll need to get the corresponding id for the corresponding option
          // one field id should be able to alter one option only.
          // The one with the same key in the mirrorOptions as in the id?
          mirrorOptions = this.state.mirrorCustomOptions;
          const newOption = e.target.mirrorOptions[0];

          if (!this.state.mirrorCustomOptions.includes(newOption)) {
            mirrorOptions = [...mirrorOptions, newOption];
          }

          this.setState({
            mirrorCustomOptions: mirrorOptions,
          });
        } // This means we've selected the 'Custom' radio button and we need to
          // clear out the mirror options, otherwise the new options would be prepended
          // TODO get rid of this once the field mapping is done
        else if (e.target.id.includes("radio-custom-question-type")) {
          this.setState({
            mirrorCustomOptions: [],
          });
        }
        else {
          mirrorOptions = "mirrorOptions" in e.target ? e.target.mirrorOptions : [];
        }

        return <select className={"mirror-input-element"}>
          {mirrorOptions.map((option, key) => <option
            value={key}>{option}</option>)}
        </select>;

      case "SelectMultiple":
        this.setState({
          lengthClass: "hidden",
        });
        // I'll need to map through the options and they should all be one of these
        return <Checkbox className={"mirror-input-element"} label={"pakisztan"} value={"pakisztan"}>
        </Checkbox>;

      case "ChooseOne":
        this.setState({
          lengthClass: "hidden",
        });
        // I'll need to map through the options and they should all be one of these
        return <Radio className={"mirror-input-element"} label={"tadzsikisztan"} value={"tadzsikisztan"}>
        </Radio>;

      case "Number":
        this.setState({
          lengthClass: "hidden",
        });
        // TODO use the proper Number component
        return <input type={"number"} className={"mirror-input-element"}/>;

      case "Datepicker":
        this.setState({
          lengthClass: "hidden",
        });

        return <input type={"date"} className={"mirror-input-element"}/>;

      case "Fieldset":
        this.setState({
          lengthClass: "hidden",
        });

        return <fieldset>
          <div>
            <legend>Person</legend>
          </div>
          <div><label>First Name</label><input type="text"/></div>
          <div><label>Last Name</label><input type="text"/></div>
          <div><label>Email address</label><input type="text"/></div>
        </fieldset>;

      case "Subtable":
        this.setState({
          lengthClass: "hidden",
        });

        // lol
        return;

      default:
        this.setState({
          lengthClass: "hidden",
        });

        return;
    }
  };

  calculateRangeOptions = (start, end) => {
    const options = [];
    const range = end - start;

    // Could do much better than this
    if (range > 0) {
      for (let i = 0; i <= range; i++) {
        options[i] = start + i;
      }
    }
    else {
      let neg = Math.abs(range);
      for (let i = 0; i <= neg; i++) {
        options[i] = start - i;
      }
    }

    return options;
  };

  render() {
    const question_id = this.props.id;
    this.props.getFields(this.state);

    return (
      <div className={"question-mirror-pair-wrapper row"}>
        <div className={"question col"} id={"question-" + question_id}>
          <div className={"question-number"}>
            {question_id}
          </div>

          {/* Name */}
          <Text id={"question-name-" + question_id}
                label={"Question"}
                setMirrorValue={this.updateMirrorValues}/>

          {/* Type */}
          <QuestionFieldSelectType id={"question-type-" + question_id}
                                   label={"Type"}
                                   setMirrorValue={this.updateMirrorValues}/>

          {/* Required? */}
          <QuestionFieldRequired id={"question-required-" + question_id}
                                 label={"Required?"}
                                 setMirrorValue={this.updateMirrorValues}/>

          {/* Help text */}
          <Text id={"question-helptext-" + question_id}
                label={"Help text"}
                setMirrorValue={this.updateMirrorValues}/>

          {/* Shortname */}
          <Text id={"question-shortname-" + question_id}
                label={"Short name"}/>

          {/* Tinyname */}
          <Text id={"question-tinyname-" + question_id}
                label={"Tiny name"}/>

          {/* Length */}
          <div className={this.state.lengthClass}>
            <QuestionFieldLength id={"question-field-length-" + question_id}
                                 label={"Length"}
                                 setMirrorValue={this.updateMirrorValues}/>
          </div>
        </div>

        {/* Mirror */}
        <Mirror questionId={question_id} id={"mirror-" + question_id}
                questionText={this.state.mirrorQuestion}
                inputElement={this.state.mirrorInput}
                required={this.state.mirrorRequired}
                helpText={this.state.mirrorHelpText}
                inputLength={this.state.mirrorLength}
        />
      </div>
    )
  }
}


/*

TODO rename file to index
TODO need a more generic input type
TODO subtables define rows and columns and all the types of those
TODO make sure actually the surrounding of the question text is changing to p or h2, don't wrapre the existing stuff in a new one
TODO disable all the fields if p or h2 selected.
TODO add limitation to number of options in custom options
TODO change order of the questions!
TODO apply mirror field's legth when length is set

'name'            => 'nichs_feos_1',  // to be generated
'af_field_id'     => null,            // to be generated


 $boringFields = [
    'Lookup',
    'Calculated Field',
    'Subform',
    'Spacer',
    'h2',
    'p',
    'Fieldset',
    'Tabs',
    'section',
    'Result Table',
    'Tab',
    'Tabs',
    'div',
    'alert',
    'Subtable',
  ];
*/
/* add preview!! */
/* add ability to clone field!! clone previous, clone another one! */

export default Question;
