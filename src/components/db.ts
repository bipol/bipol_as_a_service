import * as sqlite3 from "sqlite3";
import config from "./config";

let db = new sqlite3.Database(config.dbName);

interface Messages {
  data: Array<string>;
}

// get messages from the database
function getMessages(isMine = false): Messages {
  if (isMine) { // grab all of my messages
    let query = 'select text from messages where is_from_me EQUALS 1';
    let data = db.run(query);
    console.log(data);
  } else {
    // grab
    let query = 'select text from messages where is_from_me EQUALS 0';
    let data = db.run(query);
    console.log(data);
  }
  return { data: ['test'] };
};
