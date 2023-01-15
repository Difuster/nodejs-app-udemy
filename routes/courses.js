const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (req, res) => { // полный путь /courses мы указываем в файле
// index.js в конструкции app.use

  const courses = await Course.getAll();
  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses: courses,
  });

});

router.get('/:id/edit', async (req, res) => {
  if(!req.query.allow) { // query-парметры считываются со строки url:
    ///courses/{{id}}/edit?allow=true - allow=true После знака ? это и есть query параметры
    return res.redirect('/');
  }

  const course = await Course.getById(req.params.id);
  res.render('course-edit', {
    course,
  })
})

router.post('/edit', async (req, res) => {
  await Course.update(req.body);
  res.redirect('/courses');
})

router.get('/:id', async (req, res) => {
  const course = await Course.getById(req.params.id);
  res.render('course', {
    layout: 'empty',
    course: course,
  });
})

module.exports = router;
