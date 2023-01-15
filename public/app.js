document.querySelectorAll('.price').forEach(node => {
// Объект Intl.NumberFormat является конструктором объектов, 
// включающих языка-зависимое форматирование чисел
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(node.textContent)
// в метод format помещаем сущность, которую нужно отформатировать соответственно локали
})