const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

module.exports = router;

router.get('/statistics', async(req, res) => {

  const todoNumber = await redis.getAsync('added_todos');

  console.log('todonumber',todoNumber);

  if(!todoNumber){
      res.send({ added_todos: 0 });
  } else {
    res.send({ added_todos: Number(todoNumber) });
  }
})

module.exports = router;