const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    const categoryData = await Category.findAll({
      include: [
        { model: Product }
      ]
    });
    res.json(categoryData);
  } catch (err) {
    res.json(err);
}});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {

    const categoryDataID = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!categoryDataID) {
      res.json({ message: 'Category ID does not exist!' });
    } else {
      res.json(categoryDataID);
    }
  } catch (err) {
    res.json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(categoryData => 
    res.json(categoryData))
    .catch(err => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((category) => {
    res.json(category);
  }
  ).catch((err) =>
    res.json(err));
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.json({ message: 'Category ID does not exist!' });
    } else {
      res.json(categoryData);
    }
  }
  catch (err) {
    res.json(err);
  }
});

module.exports = router;
