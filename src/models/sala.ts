import { Schema, model, models } from "mongoose";

const salaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Sala =
  typeof models.Sala !== "undefined"
    ? model("Sala")
    : model("Sala", salaSchema);

export default Sala;
