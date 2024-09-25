import express from "express"

import {getAllArticles , createArticle , deleteArticle , getArticleById , updateArticle } from "../controllers/Articles.controller.js"
import {authorizeRoles , authMiddleware} from "../middleware/auth.middleware.js"
const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', authMiddleware, authorizeRoles('Author', 'Admin'), createArticle);
router.put('/:id', authMiddleware, authorizeRoles('Author', 'Admin'), updateArticle);
router.delete('/:id', authMiddleware, authorizeRoles('Admin'), deleteArticle);

export default  router ;
