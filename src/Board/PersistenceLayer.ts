import xml2js from 'xml2js';
import fs from 'fs';
import map from 'lodash/map';
import CardObject from '../types/CardObject';

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

export const load = (setInitialState) => {
  //TODO if not found, go to defaultBoard.xml
  fs.readFile(__dirname + '/../currentData.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
      const columns = result.board.column;
      const initialState = map(columns, (column) => {
        const name = column['$']['name'];
        const cardsFromXml = column['card'];
        const cards = map(cardsFromXml, (cardItem) => {
          const uid = cardItem['$']['uid'];
          const textContent = cardItem['_'];
          return new CardObject(uid, textContent);
        });

        return {
          name,
          cards,
        };
      });
      setInitialState(initialState);
    });
  });
};

export const save = (dispatch, getState) => {
  const { board: columns } = getState();
  const savingObject = {
    board: {
      column: map(columns, ({ name, cards }) => ({
        $: { name },
        card: map(cards, ({ uid, content }) => ({
          // cardObject
          _: content,
          $: { uid },
        })),
      })),
    },
  };

  const xml = builder.buildObject(savingObject);
  fs.writeFile('./currentData.xml', xml, (err) => {
    if (err) {
      debugger;
      console.log('an error happened', err);
    }
  });
  //TODO write our xml to file with proper name
};
