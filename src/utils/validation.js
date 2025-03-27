const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name field is not Correct");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Your Password is not Strong");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Your emailId is not valid");
  }
};

const validateEditData = (req) => {
  const editableFieldsData = [
    "firstName",
    "lastName",
    "gender",
    "skills",
    "age",
    "about",
    "photoUrl",
  ];
  const isEditableData = Object.keys(req.body).every((field) =>
    editableFieldsData.includes(field)
  );
  return isEditableData;
};

module.exports = { validateSignupData, validateEditData };
