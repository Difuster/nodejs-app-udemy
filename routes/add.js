const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true,
  });
});

router.post('/', async (req, res) => {
  const course = new Course(req.body.title, req.body.price, req.body.img);

  await course.save();

  res.redirect('/courses'); // перенаправляем юзера на страницу с курсами с помощью метода redirect
})

module.exports = router;
