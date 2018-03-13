import dateAfterInclusive from './functions/date-after-inclusive';
import dateBeforeInclusive from './functions/date-before-inclusive';
import deepEquals from './functions/deep-equals';
import empty from './functions/empty';
import equals from './functions/equals';
import greaterThan from './functions/greater-than';
import includes from './functions/includes';
import match from './functions/match';
import regex from './functions/regex';
import typeOf from './functions/type-of';

const fn = {
  dateAfterInclusive,
  dateBeforeInclusive,
  deepEquals,
  empty,
  equals,
  greaterThan,
  includes,
  match,
  regex,
  typeOf,
};

export default (id, custom) => (
  (left, right) => {
    let f = id;
    let result = false;

    try {
      if (id.indexOf('!') === 0) {
        f = id.replace('!', '');
        result = !Object.assign({}, fn, custom)[f](left, right);
      } else {
        result = Object.assign({}, fn, custom)[f](left, right);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`regent error:
        fn: "${f}"
        left: "${JSON.stringify(left)}"
        right: "${JSON.stringify(right)}"
        error: ${e}
      `);
    }

    return result;
  }
);
