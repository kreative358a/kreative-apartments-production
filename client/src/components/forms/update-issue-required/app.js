import React from "react";
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";

const options = [
  { value: 1, label: "1 - One" },
  { value: 2, label: "2 - Two" },
  { value: 3, label: "3 - Three" }
];

const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={options}
  />
);

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="card mb-3">
          <div className="card-body">
            <form>
              <div className="form-group">
                Select
                <Select options={options} required />
              </div>
              <div className="form-group">
                Select
                <Select options={options} />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
