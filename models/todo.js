const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    description: {
        type: String,
        required :true
    },
    done: {
        type :Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema);