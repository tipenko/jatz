import { MOVE_CARD, UPDATE_CARD, FINISH_ADD_CARD } from '../Board/actionTypes';

export default class LogEvent {
  constructor(time, type, extras) {
    this.time = time;
    this.type = type;
    this.extras = extras;
  }

  getShortText() {
    const [first, second, third] = this.extras;

    switch (this.type) {
      case MOVE_CARD:
        return second;
      case UPDATE_CARD:
        return `updated`;
      case FINISH_ADD_CARD:
        return `created`;
    }
  }

  getLongText() {
    const [first, second, third] = this.extras;

    switch (this.type) {
      case MOVE_CARD:
        return `${first} ➡️ ${second}`;
      case UPDATE_CARD:
        return `content = ${first}`;
      case FINISH_ADD_CARD:
        return `this card was created`;
    }
  }
}
