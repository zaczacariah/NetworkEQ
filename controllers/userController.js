const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find().populate('thoughts').populate('friends', 'username -_id');
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}