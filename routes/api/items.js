var express = require('express');
var router = express.Router();

// create fake data START
const rand = base => Math.round(Math.random()*base)
const ITEM_PROPERTY_TYPES = ['text', 'img', 'audio', 'video']
const ITEMS_EXAMPLE = Array(10).fill(0).map((x, idx) => {
  
  return {
    id: idx,
    name: `name ${rand(20)}`,
    sections: Array(rand(6)+1)
      .fill(0)
      .map(x => {
        const _type = ITEM_PROPERTY_TYPES[rand(3)]
        return {
          type: _type,
          data: `this section is of type : ${_type}`
        }
      })
  }
})
// create fake data END

// dummy API
router.get('/', function(req, res) {
  res.json({items: ITEMS_EXAMPLE});
});
router.get('/:id', function(req, res) {
  res.json(ITEMS_EXAMPLE[req.params.id]);
});

module.exports = router;
