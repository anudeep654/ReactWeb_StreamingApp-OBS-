import React from "react";
import { Field, reduxForm } from "redux-form";
import { validate } from "../validate";

class StreamForm extends React.Component {
  renderInput = ({ input, type, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="ui form error" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          type="text"
          label="Enter Title"
          component={this.renderInput}
        />
        <Field
          name="description"
          type="text"
          label="Enter Description"
          component={this.renderInput}
        />
        <button className="ui primary button">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);
