import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../store/actions/index";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "362655660591-v9qkaak0npn6qvisan0tcgtjdq3nrqdg.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = isSignedIn => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutlick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div>I dont Know if we are signed in</div>;
    } else if (this.props.isSignedIn === true) {
      return (
        <div>
          <button
            className="ui red google button"
            onClick={() => this.onSignOutlick()}
          >
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="ui red google button"
            onClick={() => this.onSignInClick()}
          >
            <i className="google icon" />
            Sign In With Google
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: id => dispatch(signIn(id)),
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth);
