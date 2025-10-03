import User from "../models/User.js";

async function isEmailExist(email) {
  const user = await User.findOne({ email });
  return user ? true : false;
}

export default isEmailExist;
