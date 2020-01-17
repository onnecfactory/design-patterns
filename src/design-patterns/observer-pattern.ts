interface Subscriber {
  update(): void;
}

class Student implements Subscriber {
  messagesReceived: number;
  id: string;

  constructor(id: string) {
    this.id = id;
    this.messagesReceived = 0;
  }

  update() {
    this.messagesReceived++;
  }

  print() {
    console.log(`${this.id}: ${this.messagesReceived}`);
  }
}

class MessagesBoard {
  subscribers: Subscriber[];
  messagesReceived: [string, string][];
  constructor() {
    this.subscribers = [];
    this.messagesReceived = [];
  }
  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }
  unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(index, 1);
  }
  notify() {
    console.log(`Notifying all subscribers ${this.subscribers.length}`);
    this.subscribers.forEach(subscriber => {
      subscriber.update();
    });
  }
  addMessage(from: string, message: string) {
    console.log(`Adding Message to Board`);
    console.log(`From: ${from}`);
    console.log(`Message: ${message}`);
    this.messagesReceived.push([from, message]);
    this.notify();
  }
  printMessages() {
    console.log(`Messages Received ${this.messagesReceived.length}`);
    this.messagesReceived.forEach(messageReceived => {
      console.log(`${messageReceived[0]}: ${messageReceived[1]}`);
    });
  }
}

const messagesBoard = new MessagesBoard();

const ricardo = new Student("ricardo");
const juan = new Student("juan");

messagesBoard.subscribe(juan);
messagesBoard.subscribe(ricardo);

messagesBoard.addMessage("ricardo", "hola como están todos!!");
messagesBoard.unsubscribe(ricardo);
messagesBoard.addMessage("other", "Este es otro mensaje");

ricardo.print();
juan.print();
