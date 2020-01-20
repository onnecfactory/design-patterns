interface Handler {
  setNext(h: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  next: Handler;
  constructor() {
    this.next = null;
  }
  setNext(h: Handler): Handler {
    this.next = h;
    return this.next;
  }
  handle(request: string): void {
    if (this.next !== null) this.next.handle(request);
  }
}

class HandlerA extends BaseHandler {
  handle(request: string): void {
    console.log("Handler A");
    if (request === "A") {
      console.log("Processing request...");
    } else {
      console.log("Seding request to the next Handler...");
      super.handle(request);
    }
  }
}

class HandlerB extends BaseHandler {
  handle(request: string): void {
    console.log("Handler B");
    if (request === "B") {
      console.log("Processing request...");
    } else {
      console.log("Seding request to the next Handler...");
      super.handle(request);
    }
  }
}

class HandlerC extends BaseHandler {
  handle(request: string): void {
    console.log("Handler C");
    if (request === "C") {
      console.log("Processing request...");
    } else {
      console.log("Seding request to the next Handler...");
      super.handle(request);
    }
  }
}

const h1 = new HandlerA();
const h2 = new HandlerB();
const h3 = new HandlerC();

h1.setNext(h2).setNext(h3);

h1.handle("C");
