import React from "react";
import { hot } from "react-hot-loader";

class FormatSelector extends React.Component {

  constructor(props){
    super(props);
  }

  render () {
    return (
        <div className="form-group">
            <label htmlFor="select_main">Format</label>
            <select onChange={this.props.formatChanged} id="select_main" name="format" className="form-control">
            {this.props.validTypes.map(type => {
                return (
                    <optgroup key={type} label={type}>
                        {this.props.validFormat[type].map(format => {
                        return (
                            <option key={format} value={format}>{format}</option>
                        );
                    })}
                    </optgroup>
                )
            })}
            </select>
        </div>
    )
  }
};

export default hot(module)(FormatSelector)
