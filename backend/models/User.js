const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4 } = require("uuid");
const { isEmail, isMobilePhone } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
      },
    },
    phoneNum: {
      type: Number,
      validate: {
        validator: isMobilePhone,
        message: "{VALUE} is not a valid phone number",
        isAsync: false,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    bookmarks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }]
  },
  {
    timestamps: true,
  },

);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
