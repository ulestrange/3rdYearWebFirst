

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;




const UserSchema = new Schema(
    {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
    },
    { toJSON: { virtuals: true } } // include virtuals when document is converted to JSON   
);


UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});






//UserSchema.plugin(uniqueValidator);

let User = mongoose.model('User', UserSchema);

export  { User }
