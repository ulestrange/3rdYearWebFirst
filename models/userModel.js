

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

// Users will either have an authID which will be their facebookId
// or they will have an e-mail.

const UserSchema = new Schema(
    {
    authId: {type: String, index : {unique : true}},
    name: String,
    email: { type: String,  index :{unique: true} },
    password: { type: String }, 
    permissionLevel: Number,  // for later athorization
    },
    { toJSON: { virtuals: true } } // include virtuals when document is converted to JSON   
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});




let User = mongoose.model('User', UserSchema);

export  { User }
