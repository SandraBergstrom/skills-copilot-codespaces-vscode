// Create web server
// Set up router
// Set up routes
// Export router

const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const recipes = require("../data/recipes");

router.get("/:recipeId", async (req, res) => {
    try {
        const recipe = await recipes.getRecipeById(req.params.recipeId);
        res.json(recipe.comments);
    } catch (e) {
        res.status(404).json({ error: "Recipe not found" });
    }
});

router.post("/:recipeId", async (req, res) => {
    const commentData = req.body;

    if (!commentData) {
        res.status(400).json({ error: "You must provide data to create a comment" });
        return;
    }

    if (!commentData.poster) {
        res.status(400).json({ error: "You must provide a poster" });
        return;
    }

    if (!commentData.comment) {
        res.status(400).json({ error: "You must provide a comment" });
        return;
    }

    try {
        await recipes.getRecipeById(req.params.recipeId);
    } catch (e) {
        res.status(404).json({ error: "Recipe not found" });
        return;
    }

    try {
        const newComment = await comments.createComment(commentData.poster, commentData.comment);
        const updatedRecipe = await recipes.addCommentToRecipe(req.params.recipeId, newComment._id, newComment.poster);
        res.json(newComment);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get("/:recipeId/:commentId", async (req, res) => {
    try {
        const recipe = await recipes.getRecipeById(req.params.recipeId);
        res.json(recipe.comments[req.params.commentId]);
    } catch (e) {
        res.status(404).json({ error: "Recipe or comment not found" });
    }
});

router.put("/:recipeId/:commentId", async (req, res) => {
    const updatedData = req.body;

    if (!updatedData) {
        res.status(400).json({ error: "You must provide data to update a comment" });
        return;
    }

    if (!updatedData.newComment) {
        res.status(400).json({ error: "You must provide a new comment" });
        return;
    }

    try