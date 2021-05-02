import dateFormat from 'dateformat';

const format = (time) => dateFormat(time, 'ddd HH:MM');
export const formatDate = (time) => dateFormat(time, 'mmmm dd');

export default format;
