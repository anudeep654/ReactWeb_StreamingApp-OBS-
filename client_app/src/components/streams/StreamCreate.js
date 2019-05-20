import React from "react";
import { CreateStream } from "../../store/actions/index";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";
class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.CreateStream(formValues);
  };

  render() {
    return (
      <div>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { CreateStream }
)(StreamCreate);
