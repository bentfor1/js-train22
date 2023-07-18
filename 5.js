// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.
class Writer {
  #content = "";

  // Сетер для властивості content.
  set content(newContent) {
    this.#content = newContent;
    this.#store();
  }

  // Метод гетер для властивості content.
  get content() {
    return this.#content;
  }

  // Приватний метод #store використовується для зберігання поточного стану тексту.
  #store() {
    Version.create(this.#content);
  }

  // Метод restore відновлює попередній стан тексту.
  restore() {
    const lastVersion = Version.restore();
    if (lastVersion) {
      this.#content = lastVersion;
    }
  }
}

class Version {
  static #versions = [];

  constructor(content) {
    this.content = content;
  }

  // Статичний метод create створює новий екземпляр класу Version з переданим content і додає його до масиву версій.
  static create(content) {
    const version = new Version(content);
    this.#versions.push(version);
  }

  // Статичний метод restore видаляє останній елемент масиву версій і повертає його content.
  static restore() {
    const lastVersion = this.#versions.pop();
    if (lastVersion) {
      return lastVersion.content;
    }
    return null;
  }
}
console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

//Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
