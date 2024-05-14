import mongoose, { Schema, model, models } from "mongoose";

const salaSchema = new Schema({
  name: { type: String, required: true },
  lore: { type: String, required: false },
  characterSheets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharacterSheet",
      unique: true,
    },
  ],
});

const Sala =
  typeof models.Sala !== "undefined"
    ? model("Sala")
    : model("Sala", salaSchema);

export default Sala;
