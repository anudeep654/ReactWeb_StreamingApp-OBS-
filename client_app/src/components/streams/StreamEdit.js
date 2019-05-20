import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../store/actions/index";
import StreamForm from "./StreamForm";
import _ from "lodash";
class StreamEdit extends React.Component {
  render() {
    if (this.props.stream) {
      return (
        <div>
          <h2>Stream Edit</h2>
          <StreamForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(this.props.stream, "title", "description")}
          />
        </div>
      );
    } else {
      return <div>loading ..</div>;
    }
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  componentWillMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
