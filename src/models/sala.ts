import mongoose, { Schema, model, models } from "mongoose";

const salaSchema = new Schema({
  name: { type: String, required: true },
  lore: { type: String, required: false },
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
});

const Sala =
  typeof models.Sala !== "undefined"
    ? model("Sala")
    : model("Sala", salaSchema);

export default Sala;
