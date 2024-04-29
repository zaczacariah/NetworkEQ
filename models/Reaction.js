const mongoose = require('mongoose');
const { Schema, model } = mongoose;



// Schema to create Reaction model
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

// Getter for created at Time
function time(createdAt){
  //2022-02-26T17:08:14.008Z
  return `${createdAt.getHours()}:${createdAt.getMinutes()} on ${createdAt.getDate()}/${createdAt.getMonth()+1}/${createdAt.getFullYear()}`;
}



module.exports = reactionSchema;
