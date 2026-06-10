import bcrypt from "bcryptjs";

const comparePassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

export default comparePassword;
