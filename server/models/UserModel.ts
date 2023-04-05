import { Schema, Document, model } from 'mongoose';
import { User } from './types.js';
import bcrypt from 'bcryptjs';

// declare a new interface for User Model
interface IUserModel extends User, Document {}

const userSchema = new Schema<IUserModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: String }],
  preferences: { type: Object, required: true, minimize: false },
});

// bcrypt pre middleware
userSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) return next(saltError);
      else {
        bcrypt.hash(this.password, salt, (hashError, hash) => {
          if (hashError) return next(hashError);
          this.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

export const UserModel = model<IUserModel>('User', userSchema);
