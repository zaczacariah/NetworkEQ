const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: time
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

function time(createdAt){
    //2022-02-26T17:08:14.008Z
    return 'TimeStamp to be done';
}


const Thought = model('thought', thoughtSchema);

module.exports = { Thought, thoughtSchema };
