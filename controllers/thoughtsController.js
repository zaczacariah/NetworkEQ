// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async getThought ( req, res ) {
        try {
            const thought = await Thought.findById(req.params._id);

            if(!thought){
                return res.status(404).json({ message: "No Thought exists with this ID"});
            }

            return res.status(200).json(thought);

        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    },

    async createThought( req,res ) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate({ username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true })

            if(!user){
                return res.status(404).json({ message: "No User with this thought's username.", thought})
            }

            return res.status(201).json({ message: "Thought successfully created", thought });

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async updateThought( req,res ) {
        try {
            const oldThought = await Thought.findById(req.params._id);

            if(!oldThought) {
                return res.status(404).json({ message: "No Thought with that Id."});
            }

            const userAdjust = await User.findOne({ username: req.body.username});
            if(!userAdjust){
                return res.status(404).json( { message: "No user with that username found"});
            }

            const thought = await Thought.findByIdAndUpdate(req.params._id, req.body, { new:true });
            
            if(!thought) {
                return res.status(404).json( { message: "No thought with that Id."});
            }

            //if updating username - then remove thought from previous user and add to new
            if(req.body.username) {
                const oldUser = await User.findOneAndUpdate({ username: oldThought.username },
                    { $pull: { thoughts: thought._id } },
                    { new: true });
                
                
                const newUser = await User.findOneAndUpdate({ username: req.body.username }, 
                    { $push: { thoughts: thought._id} },
                    { new: true })
            }

            return res.status(201).json({ message: "Updated thought succesfully.", thought})

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    
    async deleteThought(req, res) {
        try{
            const _id = req.params._id; 

            const thought = await Thought.findOneAndDelete({ _id });

            if (!thought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            //Remove the Id Object from the User
            await User.findOneAndUpdate({ username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true });

         
            return res.status(200).json({ message: "Thought deleted successfully" });
        
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        
    },

    async createReaction( req, res ){
        try {

            const { reactionBody, username } = req.body;

            if(!reactionBody | !username ){
                return res.status(400).json({ message: "Reaction Contents Missing"});
            }

            const thought = await Thought.findByIdAndUpdate(req.params._id, 
                { $push: { reactions: {
                    reactionBody,
                    username
                }}},
                { new: true });

            if(!thought){
                return res.status(404).json({ message: "No thought with that Id"});
            }

            return res.status(200).json({ message: "Reaction succesfully added", thought})

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    async deleteReaction( req, res ){
        try {
            
            if(!req.body.reactionId) {
                return res.status(404).json({ message: "Missing reactionId in body."});
            }

            const thought = await Thought.findByIdAndUpdate(req.params._id,
                { $pull: { reactions: { reactionId: req.body.reactionId }}},
                { new: true });

            if(!thought){
                return res.status(404).json({ message: "No thought with that Id"});
            }

            return res.status(200).json({ message: "Reaction succesfully removed", thought})
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

}

