const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name field is not Correct");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Your Password is not Strong");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Your emailId is not valid");
  } else if (!skills.length > 0 && skills.length < 5) {
    throw new Error("Player should have min of one and max of 5 skills");
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
