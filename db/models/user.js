import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleEnum = {
  values: ['SUPER_ADMIN', 'ADMIN', 'USER'],
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
}

const StatusEnum = {
  values: ['ACTIVE', 'IN_ACTIVE'],
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
}

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: RoleEnum,
    default: 'USER'
  },
  email_otp: {
    type: Number
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: StatusEnum,
    default: 'ACTIVE'
  },
}, {
  timestamps: true
});

export const UserModel = mongoose.model('users', UserSchema);