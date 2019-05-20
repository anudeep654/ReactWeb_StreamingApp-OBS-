export const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "you must enter a title";
  }
  if (!values.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
