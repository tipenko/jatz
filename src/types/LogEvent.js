import { MOVE_CARD, UPDATE_CARD, FINISH_ADD_CARD } from '../Board/actionTypes';

export default class LogEvent {
  constructor(time, type, extras) {
    this.time = time;
    this.type = type;
    this.extras = extras;
  }

  getShortText() {
    const [first, second, third] = this.extras || [];

    switch (this.type) {
      case MOVE_CARD:
        return second;
      case UPDATE_CARD:
        return `updated`;
      case FINISH_ADD_CARD:
        return `created`;
    }
  }

  get from() {
    if (this.type == MOVE_CARD) {
      return this.extras[0];
    }
  }

  get to() {
    if (this.type == MOVE_CARD) {
      return this.extras[1];
    }

    if (this.type == FINISH_ADD_CARD) {
      return this.extras[0];
    }
  }

  get content() {
    if (this.type == UPDATE_CARD) {
      return this.extras[0];
    }
  }

  get isInProgressStartsRecord() {
    switch (this.type) {
      case MOVE_CARD:
        return this.from != this.to && this.to == 'in progress';
      case FINISH_ADD_CARD:
        return this.to == 'in progress';
      default:
        return false;
    }
  }

  get isInProgressEndRecord() {
    return this.from != this.to && this.from == 'in progress';
  }

  getLongText() {
    switch (this.type) {
      case MOVE_CARD:
        return `${this.from} ➡️ ${this.to}`;
      case UPDATE_CARD:
        return `content = ${this.content}`;
      case FINISH_ADD_CARD:
        return `created to ${this.to}`;
    }
  }
}
