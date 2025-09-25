var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')

// GET all categories
router.get('/', async function(req, res, next) {
  try {
    let categories = await categoryModel.find({})
    res.send({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      data: error
    })
  }
});

// GET category by ID
router.get('/:id', async function(req, res, next) {
  try {
    let item = await categoryModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send({
        success: false,
        message: "Category not found"
      })
    }
    res.send({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      data: error
    })
  }
});

// POST create new category
router.post('/', async function(req, res, next) {
  try {
    let newItem = new categoryModel({
      name: req.body.name
    })
    await newItem.save()
    res.send({
      success: true,
      data: newItem
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error
    })
  }
})

// PUT update category
router.put('/:id', async function(req, res, next) {
  try {
    let updatedItem = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      }, {
        new: true
      }
    )
    if (!updatedItem) {
      return res.status(404).send({
        success: false,
        message: "Category not found"
      })
    }
    res.send({
      success: true,
      data: updatedItem
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error
    })
  }
})

// DELETE category
router.delete('/:id', async function(req, res, next) {
  try {
    let deletedItem = await categoryModel.findByIdAndDelete(req.params.id)
    if (!deletedItem) {
      return res.status(404).send({
        success: false,
        message: "Category not found"
      })
    }
    res.send({
      success: true,
      data: deletedItem,
      message: "Category deleted successfully"
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      data: error
    })
  }
})

module.exports = router;
