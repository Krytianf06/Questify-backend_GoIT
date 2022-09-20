const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
          type: String,
          minlength: 4,
          maxlength: 70,
          required: [true, 'Set name for contact'],

        },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          lowercase: true,
          required: [true, 'Email is required'],
          unique: true,
        },
        token: {
          type: String,
          default: null,
        },
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, "Verify token is required"],
      },
      },
      { versionKey: false, timestamps: true }
);

const User = mongoose.model("user", userSchema, "users");

module.exports = User;