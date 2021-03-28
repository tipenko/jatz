export default class CardObject {
  uid: string;
  content: string;
  logRecords: any[];

  constructor(uid: string, content: string, logRecords: any[] = []) {
    this.uid = uid;
    this.content = content || uid;
    this.logRecords = logRecords;
  }
}

export const addLogRecord = (logRecord: any) => (card: CardObject) => {
  const { uid, content, logRecords: oldLogRecords } = card;
  const logRecords = [...oldLogRecords, logRecord];
  return new CardObject(uid, content, logRecords);
};
