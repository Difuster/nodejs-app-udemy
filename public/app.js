const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
// Объект Intl.NumberFormat является конструктором объектов, 
// включающих языка-зависимое форматирование чисел
  node.textContent = toCurrency(node.textContent);
// в метод format помещаем сущность, которую нужно отформатировать соответственно локали
})

const $card = document.querySelector('#card');
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id; // получаем id курса, в строчке которого была нажата кнопка
      console.log(id)

      fetch('/card/remove/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(c => {
              return `
                <tr>
                  <td>${c.title}</td>
                  <td>${c.count}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button>
                  </td>
                </tr>
              `
            }).join('');
            $card.querySelector('tbody').innerHTML = html;
            $card.querySelector('.price').textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}