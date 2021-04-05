import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';
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

  get archivationTime() {
    const logRecordsAboutMovedToArchive = filter(this.logRecords, (logRecord) => {
      if (logRecord.type !== MOVE_CARD) {
        return false;
      }

      const [, targetColumn] = logRecord && logRecord.extras || [];
      return targetColumn == 'archived';
    });
    const movedToArchiveRecord = last(sortBy(logRecordsAboutMovedToArchive, ['time']));
    return movedToArchiveRecord ? movedToArchiveRecord.time : null;
  }
}

export const addLogRecord = (logRecord: any) => (card: CardObject) => {
  const { uid, content, logRecords: oldLogRecords } = card;
  const logRecords = [...oldLogRecords, logRecord];
  return new CardObject(uid, content, logRecords);
};
