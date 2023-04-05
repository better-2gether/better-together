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
  preferences: { type: Map, of: Number, required: true },
  eventRanks: [
    {
      event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
      rank: { type: Number, required: true },
    },
  ],
});

//bcrypt pre middleware
userSchema.pre("save", function(next) {
  const user = this;

  if(this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt){
      if(saltError) return next(saltError);
      else{
        bcrypt.hash(user.password, salt, function(hashError, hash){
          if(hashError) return next(hashError);

          user.password = hash;
          next();
        })
      }
    })
  }else{
    return next();
  }
});

export const UserModel = model<IUserModel>('User', userSchema);
