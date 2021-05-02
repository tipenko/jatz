import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';
import find from 'lodash/find';
import head from 'lodash/head';
import forEach from 'lodash/forEach';
import getTime from '../utils/generateTime';

import { MOVE_CARD } from '../Board/actionTypes';

export default class CardObject {
  uid: string;
  content: string;
  logRecords: any[];

  constructor(uid: string, content: string, logRecords: any[] = []) {
    this.uid = uid;
    this.content = content || uid;
    this.logRecords = logRecords;
  }

  get sortedLogRecords() {
    return sortBy(this.logRecords, ['time']);
  }

  get creationLogRecord() {
    return head(this.sortedLogRecords);
  }

  get archivationTime() {
    const logRecordsAboutMovedToArchive = filter(
      this.sortedLogRecords,
      (logRecord) => {
        if (logRecord.type !== MOVE_CARD) {
          return false;
        }
        //todo get rid of extras
        const targetColumn = logRecord && logRecord.to;
        return targetColumn == 'archived';
      }
    );
    const movedToArchiveRecord = last(logRecordsAboutMovedToArchive);
    return movedToArchiveRecord ? movedToArchiveRecord.time : null;
  }

  //returns set of pairs [[startTime, endTime]]
  get workingPeriodsTimes() {
    const records = this.sortedLogRecords;
    let result = [];
    let currentPair;
    let inProgressState = false;
    forEach(records, (record) => {
      if (record.isInProgressStartsRecord) {
        currentPair = [record.time];
        inProgressState = true;
      } else if (record.isInProgressEndRecord) {
        if (!currentPair) {
          debugger;
        }
        currentPair[1] = [record.time];
        result.push(currentPair);
        inProgressState = false;
      }
    });

    if (inProgressState) {
      if (!currentPair) {
        debugger;
      }
      currentPair[1] = getTime();
      result.push(currentPair);
    }

    return result;
  }
}

export const addLogRecord = (logRecord: any) => (card: CardObject) => {
  const { uid, content, logRecords: oldLogRecords } = card;
  const logRecords = [...oldLogRecords, logRecord];
  return new CardObject(uid, content, logRecords);
};
