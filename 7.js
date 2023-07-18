// Міст (Bridge) — це паттерн програмування, який дозволяє розмістити абстракцію і реалізацію в окремі класи, дозволяючи їм мати незалежний функціонал

// Клас Participant представляє користувача, який може відправляти повідомлення.
class Participant {
  constructor(alias, communicator) {
    this.alias = alias;
    this.communicator = communicator;
  }

  dispatchMessage(text) {
    // Відправка повідомлення за допомогою відповідного засобу комунікації.
    return this.communicator.transmit(this.prepareMessage(text));
  }

  prepareMessage(text) {
    // Підготовка повідомлення, додаючи до нього підпис у форматі [alias]: text.
    return `[${this.alias}]: ${text}`;
  }
}

class SMSCommunicator {
  static transmit(message) {
    // Відправка SMS повідомлення.
    return `Відправлено SMS: ${message}`;
  }
}

class EmailCommunicator {
  static transmit(message) {
    // Відправка Email повідомлення.
    return `Відправлено Email: ${message}`;
  }
}

console.log("Завдання 7 ====================================");

// Створюємо двох користувачів - Max та Linda - які відправляють повідомлення за допомогою різних засобів комунікації.
const max = new Participant("Max", SMSCommunicator);
const linda = new Participant("Linda", EmailCommunicator);

// Max відправляє повідомлення через SMS.
console.log(max.dispatchMessage("Hello!")); // Виведе: Відправлено SMS: [Max]: Hello!

// Linda відправляє повідомлення через Email.
console.log(linda.dispatchMessage("Hello!")); // Виведе: Відправлено Email: [Linda]: Hello!
