import xml2js from 'xml2js';
import fs from 'fs';
import map from 'lodash/map';
import CardObject from '../types/CardObject';
import LogEvent from '../types/LogEvent';

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

export const load = (setInitialState) => {
  fs.access(
    __dirname + '/../currentData.xml',
    fs.constants.F_OK,
    (currentFileExistsError) => {
      const fileName =
        __dirname +
        (currentFileExistsError
          ? '/../defaultBoard.xml'
          : '/../currentData.xml');
      fs.readFile(fileName, function (err, data) {
        parser.parseString(data, function (err, result) {
          const columns = result.board.column;
          const initialState = map(columns, (column) => {
            const name = column['$']['name'];
            const cardsFromXml = column['card'];
            const cards = map(cardsFromXml, (cardItem) => {
              const uid = cardItem['$']['uid'];
              const textContent = cardItem['content'][0];
              const shortId = cardItem['shortId'][0];
              const resolution = cardItem['resolution'][0];

              const logRecordsFromXml = cardItem['logRecord'];
              const logRecords = map(logRecordsFromXml, (logRecord) => {
                const time = logRecord['$']['time'] - 0;
                const type = logRecord['$']['type'];
                const extrasFromXml = logRecord.extra;
                return new LogEvent(time, type, extrasFromXml);
              });

              return new CardObject(uid, shortId, resolution, textContent, logRecords);
            });

            return {
              name,
              cards,
            };
          });
          setInitialState(initialState);
        });
      });
    }
  );
};

export const save = (dispatch, getState) => {
  const { board: columns } = getState();
  const savingObject = {
    board: {
      column: map(columns, ({ name, cards }) => ({
        $: { name },
        card: map(cards, ({ uid, content, shortId, resolution, logRecords }) => ({
          content: [{ _: content }],
          shortId: [{ _: shortId }],
          resolution: [{ _: resolution }],
          $: { uid },
          logRecord: map(logRecords, ({ time, type, extras }) => ({
            $: { time, type },
            extra: map(extras, (extra) => ({
              _: extra,
            })),
          })),
        })),
      })),
    },
  };

  const xml = builder.buildObject(savingObject);
  fs.writeFile('./currentData.xml', xml, (err) => {
    if (err) {
      console.log('an error happened', err);
    }
  });
};
