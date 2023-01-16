const path = require('path');
const fs = require('fs');

class Card {
  static async add(course) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(c => c.id === course.id);
    const candidate = card.courses[idx];

    if (candidate) {
      // если курс уже добавлен
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      // если курса еще нет в корзине
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'),
      JSON.stringify(card),
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
      )
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'card.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      })
    })
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(c => c.id === id);
    const course = card.courses[idx];

    if (course.count === 1) {
      // если количество курсов в корзине равно 1, то просто удаляем его из корзины
      card.courses = card.courses.filter(c => c.id !== course.id);
    } else {
      // если количество курсов в корзине более 1, то уменьшаем количество курсов на 1
      card.courses[idx].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'),
      JSON.stringify(card),
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      }
      )
    })
  }
}

module.exports = Card;
