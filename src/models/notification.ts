import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema({
  inviter: { type: String, required: true },
  salaId: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification =
  typeof models.Notification !== "undefined"
    ? model("Notification")
    : model("Notification", notificationSchema);

export default Notification;
