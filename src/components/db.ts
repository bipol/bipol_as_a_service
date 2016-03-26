import * as sqlite3 from "sqlite3";
import config from "./config";

let db = new sqlite3.Database(config.dbName);

interface Message {
  text: string;
}

interface Messages extends Array<any>{
  [index: number]: Message;
}

// get messages from the database
function getMessages(cb: (messages: Messages) => void, handle_id=false): void {
  let query = handle_id ? 'select text from message where handle_id=?' : 'select text from message where is_from_me=1' ;
  let result = [];
  if (handle_id) {
    db.all(query, handle_id, (err, data) => {
      if (!err) {
        cb(data);
      } else {
        console.error(err);
      }
    });
  } else {
    db.all(query, (err, data) => {
      if (!err) {
        cb(data);
      } else {
        console.error(err);
      }
    });
  }
};

export { getMessages };
