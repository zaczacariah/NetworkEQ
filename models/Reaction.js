const mongoose = require('mongoose');
const { Schema, model } = mongoose;



// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: time
    }
  },
  {
    toJSON: {
      getters: true,
    //   virtuals: true
    },
  }
);


function time(createdAt){
  //2022-02-26T17:08:14.008Z
  return 'TimeStamp to be done';
}



module.exports = reactionSchema;
