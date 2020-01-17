abstract class Component {
  chatRoom: IChatRoom;
  setChatRoom(chatRoom: IChatRoom) {
    this.chatRoom = chatRoom;
  }
}

class Collegue extends Component {
  id: string;
  name: string;
  lastname: string;
  messagesReceived: [string, string][];
  messagesSended: [string, string][];

  constructor(id: string, name: string, lastname: string) {
    super();
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.messagesReceived = [];
    this.messagesSended = [];
  }

  printMessages() {
    console.log(`I am ${this.name} ${this.lastname}.`);
    console.log(`Messages Received ${this.messagesReceived.length}`);
    this.messagesReceived.forEach(messageReceived => {
      console.log(`${messageReceived[0]}: ${messageReceived[1]}`);
    });

    console.log(`Messages Sended ${this.messagesSended.length}`);
    this.messagesSended.forEach(messageSended => {
      console.log(`${messageSended[0]}: ${messageSended[1]}`);
    });
  }

  sendMessage(to: string, message: string) {
    console.log(`I am ${this.name} ${this.lastname}.`);
    console.log(`Sending message to "${to}".`);
    console.log(`Message: ${message}`);
    this.messagesSended.push([to, message]);
    this.chatRoom.notify("send", this.id, to, message);
  }
  receiveMessage(from: string, message: string) {
    console.log(`I am ${this.name} ${this.lastname}.`);
    console.log(`Receiving message from "${from}".`);
    console.log(`Message: ${message}`);
    this.messagesReceived.push([from, message]);
  }
}

interface IChatRoom {
  notify(eventType: string, from: string, to: string, message: string): void;
}

class ChatRoom implements IChatRoom {
  collegues: Collegue[];
  constructor(...collegues: Collegue[]) {
    collegues.forEach(collegue => {
      collegue.setChatRoom(this);
    });
    this.collegues = collegues;
  }
  notify(eventType: string, from: string, to: string, message: string) {
    if (eventType === "send") {
      this.collegues.forEach(collegue => {
        if (collegue.id === to) collegue.receiveMessage(from, message);
      });
    }
  }
}

const ricardo = new Collegue("ricardosilvam", "Ricardo", "Silva Manayalle");
const idis = new Collegue("idisdub", "Idis Dubraska", "Landaeta Guerrero");

const chatRoom = new ChatRoom(ricardo, idis);

ricardo.sendMessage("idisdub", "Hola, como estás?");
ricardo.sendMessage("idisdub", "Espero te encuentres muy bien...");

idis.sendMessage("ricardosilvam", "Hola Ricardo! Estoy bien!");

ricardo.printMessages();
idis.printMessages();
