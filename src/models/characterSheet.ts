import { Schema, model, models } from "mongoose";

const characterSheetSchema = new Schema({
  name: { type: String, required: true },
  race: { type: String, required: true },
  hpMax: { type: Number, required: true },
  currHp: { type: Number, required: true },
  strength: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  constitution: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  wisdom: { type: Number, required: true },
  charisma: { type: Number, required: true },
  bonusStrength: { type: Number, default: 0 },
  bonusDexterity: { type: Number, default: 0 },
  bonusConstitution: { type: Number, default: 0 },
  bonusIntelligence: { type: Number, default: 0 },
  bonusWisdom: { type: Number, default: 0 },
  bonusCharisma: { type: Number, default: 0 },
});

const CharacterSheet =
  typeof models.CharacterSheet !== "undefined"
    ? model("CharacterSheet")
    : model("CharacterSheet", characterSheetSchema);

export default CharacterSheet;
