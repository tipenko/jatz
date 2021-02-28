import xml2js from 'xml2js';
import fs from 'fs';
import map from 'lodash/map';
import CardObject from "../types/CardObject";

const parser = new xml2js.Parser();

export const load = (setInitialState) => {
  fs.readFile(__dirname+'/../defaultBoard.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        const columns = result.board.column;
        const initialState = map(columns, column => {
          const name = column["$"]["name"];
          const cardsFromXml = column["card"];
          const cards = map(cardsFromXml, cardItem => {
            const uid = cardItem["$"]["uid"];
            const textContent = cardItem["_"];
            return new CardObject(uid, textContent);
          });

          return {
            name,
            cards
          }

        });
        setInitialState(initialState);
    });
});
};
