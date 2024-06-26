import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  profilePic: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  notificaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  characterSheets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharacterSheet",
    },
  ],
  salas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sala",
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
