import { Connection } from "./Connection/Connection.js";
import { CommandParser } from "./CommandParser/CommandParser.js";
import { EventController } from "./EventController/EventController.js";


function nextLine() {

}

const connection = new Connection();
const parser = new CommandParser();
const eventController = new EventController(document);

connection.addElement('/add/tip');
connection.addElement('/add/cmdline');

