import bcrypt from "bcryptjs";

export const hashPassword = async (candidatePassword) => {
  const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds
  const hashedPassword = await bcrypt.hash(candidatePassword, salt);
  return hashedPassword; // return the hashed password
};
