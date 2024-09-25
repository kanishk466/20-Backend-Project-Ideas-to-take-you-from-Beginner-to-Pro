import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema({

    
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    publishedDate: { type: Date, default: Date.now },
})

export default mongoose.model('Article' , ArticleSchema);
