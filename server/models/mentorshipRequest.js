import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mentorshipRequestSchema = new Schema(
  {
    aprenant: {
      type: Schema.Types.ObjectId,
      ref: "aprenant",
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "mentor",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    responseMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const MentorshipRequest = mongoose.model("mentorshipRequest", mentorshipRequestSchema);