const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
    {
        title: {
          type: String,
          required: [true, 'Set title for contact'],

        },
        difficulty: {
          type: String,
          required: [true, 'Password is required'],
        },
        category: {
          type: String,
          required: [true, 'category is required'],
        },
        date: {
          type: String,
          required: [true, 'date is required'],
        },
        time: {
          type: String,
          required: [true, 'time is required'],
        },
        type: {
          type: String,
          required: [true, 'type is required'],
      },
      },
      { versionKey: false, timestamps: true }
);

const Card = mongoose.model("card", cardSchema, "cards");

module.exports = Card;