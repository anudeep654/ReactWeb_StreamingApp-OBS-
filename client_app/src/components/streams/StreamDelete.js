import React from "react";
import Modal from "../../modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams, deleteStream } from "../../store/actions/index";
class StreamDelete extends React.Component {
  Actions = (
    <React.Fragment>
      <button
        className="ui button negative"
        onClick={() => this.onModalDeletePress()}
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );

  onModalDeletePress = () => {
    //console.log(this.props.stream.id);
    this.props.deleteStream(this.props.stream.id);
    history.push("/");
  };

  componentDidMount() {
    this.props.fetchStreams();
  }
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream with title: ${
      this.props.stream.title
    }?`;
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        Stream Delete
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.Actions}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams, deleteStream }
)(StreamDelete);
