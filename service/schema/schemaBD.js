const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
          type: String,
        },
        password: {
          type: String,
        },
        email: {
          type: String,
          lowercase: true,
          unique: true,
        },
        token: {
          type: String,
          default: null,
        },
        // verify: {
        //   type: Boolean,
        //   default: false,
        // },
        verificationToken: {
          type: String,
      },
      cards: [
        {
          title: {
            type: String,
            // unique: true, 
          },
          difficulty: {
            type: String,
            enum: ["Easy","Normal","Hard"],
            default: "Easy"
          },
          date: {
            type: String,
          },
          time: {
            type: String,
          },
          category: {
            type: String,
            enum: ["Stuff","Family","Health","Learning","Leisure","Work"],
          },
          status: {
            type: String,
            enum: ["Incomplete","Complete"],
            default: "Incomplete"

          },
          type: { 
            type: String,
            enum: ["Task","Challenge"],
            default:"Task"
          },
        }
      ]
      },
      { versionKey: false, timestamps: true }
);

const User = mongoose.model("user", userSchema, "users");

module.exports = User;