import mongoose from "mongoose"

const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // Useful for grouping messages between two people
    conversationId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model("message",messageSchema)
