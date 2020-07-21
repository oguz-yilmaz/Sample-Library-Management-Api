const faker = require('faker');

const isUnique = (arr, id1, id2) => {
  if (!arr || !arr.length) {
    return true;
  }

  for (const item of arr) {
    if (item[0] === id1 && item[1] === id2) {
      return false;
    }
  }
  return true;
};
const generateId = () => {
  return faker.random.number({
    min: 1,
    max: 20,
  });
};

module.exports = {
  generateUniqueIdPairs: function (from = 1, to = 20) {
    let idsArray = [],
      id1 = generateId(),
      id2 = generateId();

    while (isUnique(idsArray, id1, id2) || idsArray.length < to) {
      idsArray.push([id1, id2]);
      id1 = generateId();
      id2 = generateId();
    }

    return idsArray;
  },
};
