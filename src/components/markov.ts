import * as db from './db';

// so these two interfaces are the same, but did this
// for readability reasons

// corpus is indexed by initial states, and resolves to
// more states
interface TransitionMatrix {
  [index:string]: Elements;
}

interface Elements {
  length: number;
  [index:string]: number;
}

var tm : TransitionMatrix = {};
var StartingStates: string[] = [];


function generateTM(cb: (tm: TransitionMatrix, StartingStates: string[]) => void): void {
  db.getMessages( (messages) => {
    // iterate through all of our messages
    for (let message of messages) {
      // split the message into words
      if (!message.text) {
          continue;
      }
      let parsed = message.text.split(' ');
      // go through the split message
      StartingStates.push(parsed[0]);
      for (let i = 0; i < parsed.length; i++) {
        // if this is not in our TM, add it
        if (!tm[parsed[i]]) {
          tm[parsed[i]] = {length: 0};
        }
        let element = tm[parsed[i]];
        // if we aren't at the last element
        if (i + 1 != parsed.length) {
          // if we haven't created this state transition yet
          if (!element[parsed[i+1]]) {
            element.length++;
            element[parsed[i+1]] = 1;
            continue;
          }
          // else we need to add 1 to the state
          element[parsed[i+1]] = element[parsed[i+1]] + 1;
          // add one to the total elements
          element.length++;
        }
      }
    }
    // recalculate probabilities for all states
    for (let word in tm) {
      for (let state in tm[word]) {
        if (state === 'length') {
          continue;
        }
        tm[word][state] = tm[word][state] / tm[word].length;
      }
    }
    cb(tm, StartingStates);
  });
}

export { generateTM };
