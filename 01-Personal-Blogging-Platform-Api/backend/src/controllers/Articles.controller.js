import Article from "../models/Articles.model.js"

// Get All Articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

// Get Single Article by ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author');
    if (!article) return res.status(404).send('Article Not Found');
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};

// Create Article
export const createArticle = async (req, res) => {
  const { title, body, tags } = req.body;

  try {
    const article = new Article({ title, body, tags, author: req.user._id });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
};

// Update Article
export const updateArticle = async (req, res) => {
  const { title, body, tags } = req.body;

  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article Not Found');

    if (article.author.toString() !== req.user._id && req.user.role !== 'Admin') {
      return res.status(403).send('Not Authorized');
    }

    article.title = title;
    article.body = body;
    article.tags = tags;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error });
  }
};

// Delete Article
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article Not Found');

    if (article.author.toString() !== req.user._id && req.user.role !== 'Admin') {
      return res.status(403).send('Not Authorized');
    }

    await article.remove();
    res.status(200).send('Article Deleted');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
};
