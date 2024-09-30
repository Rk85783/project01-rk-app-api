import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleEnum = {
  values: ["SUPER_ADMIN", "ADMIN", "USER"],
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`"
};

const StatusEnum = {
  values: ["ACTIVE", "IN_ACTIVE"],
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`"
};

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  role: {
    type: String,
    enum: RoleEnum,
    default: "USER"
  },
  emailOtp: {
    type: Number,
    min: [100000, "OTP should be at least 6 digits"],
    max: [999999, "OTP should not exceed 6 digits"]
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: StatusEnum,
    default: "ACTIVE"
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model("User", UserSchema);
