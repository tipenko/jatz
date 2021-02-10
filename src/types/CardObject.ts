export default class CardObject {
  uid: string;
  content: string;

  constructor (uid, content) {
    this.uid = uid;
    this.content = content || uid;
  }
}
