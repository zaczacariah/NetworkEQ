const { Schema, model } = require('mongoose');



// Schema to create User model
const userSchema = new Schema(
  {

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true 
    },
    email: {

        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
  }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

//Create a virtual for friend Count
userSchema.virtual('friendCount')
  .get(function() {
    return this.friends ? this.friends.length : 0;
  });

const User = model('user', userSchema);

module.exports = User;
