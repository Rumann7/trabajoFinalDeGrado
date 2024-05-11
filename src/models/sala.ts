import mongoose, { Schema, model, models } from "mongoose";

const salaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  participantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  characterSheets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharacterSheet",
    },
  ],
  code: {
    type: String,
    required: true,
  },
});

const Sala =
  typeof models.Sala !== "undefined"
    ? model("Sala")
    : model("Sala", salaSchema);

export default Sala;
