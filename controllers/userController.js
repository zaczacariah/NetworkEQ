const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const response = await User.create(req.body);

            return res.json(response);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const response = await User.findById(req.params._id).populate('thoughts').populate('friends', 'username -_id');

            return res.json(response);
        } catch (error) {
            console.log(err);
            res.send(err);
        }
    },

    async updateUser(req, res) {
        try {

            const user = await User.findById(req.params._id); 
            if (!user) {
                return res.status(404).json({ message: "No User with this Id" });
            }

            const oldUsername = user.username;
    
            const response = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
    
            const { username } = req.body;

            //if updating username then update the thoughts and reactions by the user to have the new username
            if (username && username !== oldUsername) {
                //We need all thoughts by user and any thought with a reaction by them too
                const thoughts = await Thought.find({
                    $or: [
                        { username: oldUsername },
                        { "reactions.username": oldUsername }
                    ]
                });
                for (let thought of thoughts) {
                    //update username if thought was posted by them
                    if(thought.username === oldUsername){
                        thought.username = username;
                    }
                    //update any reactions by user
                    thought.reactions.forEach(reaction => {
                        if (reaction.username === oldUsername) {
                            reaction.username = username;
                        }
                    });
                    await thought.save();
                }
            }
    
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    async deleteUser(req, res) {
        try{
            const _id = req.params._id; 

            const user = await User.findOneAndDelete({ _id });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const {username} = user;

            await Thought.deleteMany({ username });

            const thoughts = await Thought.find({ "reactions.username": username })

            for (let thought of thoughts) {
                thought.reactions = thought.reactions.filter(reaction => reaction.username !== username);
                await thought.save();
            }
         
            return res.status(200).json({ message: "User and associated data deleted successfully" });
        
            
        
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        
    },

    async addFriend(req, res) {
        try {

            const { _id, friendId } = req.params;

            const user = await User.findById(_id);
            const friend = await User.findById(friendId);

            if(!user || !friend){
                return res.status(404).json({ message: "User or Friend Not Found"})
            }

            if(user.friends.includes(friendId)){
                return res.status(400).json({ message: "This user is already your friend!"});
            }

            user.friends.push(friend._id);
            await user.save();

            return res.status(200).json( { message: "Friend added successfully.", user })

            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    async removeFriend(req, res) {
        try {

            const { _id, friendId } = req.params;

            const user = await User.findByIdAndUpdate(
                _id,
                { $pull: { friends: friendId } },
                { new: true }  // Option to return the updated document
            );

            if(!user){
                return res.status(404).json({ message: "User or Friend Not Found"});
            }

            return res.status(200).json( { message: "Friend removed successfully.", user })

            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }


    
}