const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32
    },
    difficulty_level: {
        type: String,
        required: true,
        trim: true
    },
    quiz_questions: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    quiz_key: {
        type: Array,
        required: true
    }
},{timestamps: true}
);

module.exports = mongoose.model("Quiz", quizSchema)