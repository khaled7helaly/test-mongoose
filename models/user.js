const mongoose = require("mongoose");
const validator = require("validator");

const user = mongoose.model("User", {
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    gmail: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address")
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters"],
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not contain the word 'password'")
            }
        }
    },
    city: {
        type: String,
        trim: true,
        default: "Unknown"
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
            if (value < 18) {
                throw new Error("Age must be at least 18 years old")
            }
        }
    }
})

module.exports = user;