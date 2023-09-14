const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((tagData) => {
    res.json(tagData)}
)});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', (req, res) => {
    Tag.findByPk(req.params.id).then((tagData) => {
      res.json(tagData);
    });
  });
});

router.post('/', (req, res) => {
  // create a new tag
  router.post('/', (req, res) => {
    Tag.create(req.body)
      .then((newTag) => {
        res.json(newTag);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((tag) => {
    res.json(tag);
  }).catch((err) =>
    res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {

    const tagsData = Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(tagsData);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
