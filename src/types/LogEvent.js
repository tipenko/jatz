import { MOVE_CARD, UPDATE_CARD, FINISH_ADD_CARD } from '../Board/actionTypes';

export default class LogEvent {
  constructor(time, type, extras) {
    this.time = time;
    this.type = type;
    this.extras = extras;
  }

  getText() {
    const [first, second, third] = this.extras;

    switch (this.type) {
      case MOVE_CARD:
        return `was moved from ${first} to ${second} at index ${third}`;
      case UPDATE_CARD:
        return `content was set to  from ${first}`;
      case FINISH_ADD_CARD:
        return `card was created`;
    }
  }
}
