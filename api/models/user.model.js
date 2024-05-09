import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, requires: true, unique: true },
    email: { type: String, requires: true, unique: true },

    password: { type: String, requires: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export default User;
