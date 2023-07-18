// Декоратор (Decorator) — це патерн програмування, який додає нову функціональність до існуючих об'єктів, не змінюючи їхньої структури.
// Іншими словами, він дозволяє розширити функціональність об'єкта, не змінюючи сам об'єкт.

// Клас Drink представляє основний напій, який можна приготувати.
// Цей клас містить базову вартість напою (price=10) та його ім'я (name="Чай").
class Drink {
  constructor() {
    // Додайте властивості name і price у конструктор класу Drink
    this.name = "Чай";
    this.price = 10;
  }

  prepare() {
    console.log(`Приготування ${this.name}`);
  }
}

class HoneyDecorator {
  constructor(drink, amount) {
    this.drink = drink;
    this.amount = amount;
  }

  get name() {
    return `${this.drink.name} з ${this.amount} г меду`;
  }

  get price() {
    return this.drink.price + 0.5 * this.amount;
  }

  prepare() {
    console.log(`Приготування ${this.name} з медом`);
  }
}

console.log("Завдання 4 ====================================");
// Після виконання розкоментуйте код нижче

// Створення об'єкту базового напою (чаю)
let tea = new Drink();
console.log(tea.name); // Виводить ім'я напою
console.log(tea.price); // Виводить вартість напою
tea.prepare(); // Готує напій

// Додавання декоратора меду до чаю
let honeyTea = new HoneyDecorator(tea, 2); // Додаємо 2 грами меду
console.log(honeyTea.name); // Виводить нову назву напою
console.log(honeyTea.price); // Виводить нову вартість напою
honeyTea.prepare(); // Готує напій з медом
