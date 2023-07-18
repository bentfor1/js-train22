// Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

//AuthProcessor клас для обробки аутентифікації.
class AuthProcessor {
  setNextProcessor(processor) {
    // Метод, який приймає наступний обробник (processor) в ланцюгу.
    this.nextProcessor = processor;
    return processor;
  }

  validate(username, passkey) {
    // Метод для перевірки аутентифікації.
    if (this.nextProcessor) {
      // Якщо є наступний обробник, передаємо запит на перевірку аутентифікації йому.
      return this.nextProcessor.validate(username, passkey);
    }
    return false; // Якщо немає наступного обробника, повертаємо false.
  }
}

class TwoStepProcessor extends AuthProcessor {
  validate(username, passkey) {
    // Метод для перевірки аутентифікації з двофакторним кодом.
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log("Вхід дозволено з двофакторною аутентифікацією");
      return true;
    }
    // Якщо дані не вірні, передаємо запит на аутентифікацію наступному обробнику.
    return super.validate(username, passkey);
  }

  isValidTwoStepCode() {
    // Метод для перевірки двофакторного коду.
    return true;
  }
}

class RoleProcessor extends AuthProcessor {
  validate(username, passkey) {
    // Метод для перевірки аутентифікації за роллю користувача.
    if (username === "guest") {
      console.log("Вхід дозволено з роллю гостя");
      return true;
    }
    // Якщо роль не відповідає, передаємо запит на аутентифікацію наступному обробнику.
    return super.validate(username, passkey);
  }
}

class CredentialsProcessor extends AuthProcessor {
  validate(username, passkey) {
    // Метод для перевірки облікових даних користувача.
    if (username === "admin" && passkey === "admin123") {
      console.log("Вхід дозволено за обліковими даними");
      return true;
    }
    // Якщо облікові дані не вірні, передаємо запит на аутентифікацію наступному обробнику.
    return super.validate(username, passkey);
  }
}

class ProcessorBuilder {
  constructor() {
    this.firstProcessor = null;
    this.lastProcessor = null;
  }

  add(processor) {
    // Метод для додавання нового обробника в ланцюг.
    if (!this.firstProcessor) {
      // Якщо це перший обробник, встановлюємо його як перший і останній.
      this.firstProcessor = processor;
      this.lastProcessor = processor;
    } else {
      // Якщо це не перший обробник, додаємо його в кінець ланцюга.
      this.lastProcessor.setNextProcessor(processor);
      this.lastProcessor = processor;
    }
    return this;
  }

  create() {
    // Метод для створення ланцюга обробників.
    return this.firstProcessor;
  }
}

console.log("Завдання 6 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено
