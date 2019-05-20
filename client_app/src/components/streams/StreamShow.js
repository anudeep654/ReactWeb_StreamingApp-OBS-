import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStreams } from "../../store/actions/index";
class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  render() {
    if (!this.props.stream) {
      return <div>loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchStreams();
    this.buildPlayer();
  }
  componentDidUpdate() {
    this.buildPlayer();
  }
  buildPlayer() {
    const { id } = this.props.match.params;
    if (this.player || !this.props.stream) {
      return;
    }
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }
  componentWillUnmount() {
    this.player.destroy();
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};
export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamShow);
