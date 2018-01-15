// -----ЗАДАНИЕ----- //
// записать JSON-таблицу 2 массива, в первом - города на гласную букву,
// во втором - на согласную;
// вывести сумму населения каждого массива


// -----РЕШЕНИЕ----- //
// автор: Амброс Всеволод //
'use strict';
console.time('Время выполнения кода');

const fs = require('fs');

const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p',
  'q', 'r', 's', 't', 'v', 'w', 'x', 'z']; // согласные буквы

const vowels = ['a', 'e', 'i', 'o', 'u', 'y']; // гласные буквы


const fileRead = path => fs.readFileSync(path, 'utf8');

const normalizeNumber = stringNumber => // converts '123,456,789' -> 123456789
  parseInt(stringNumber.split(',').join(''));

const divide = () => { // разделение массива
  const mainArray = JSON.parse(fileRead('table.json'));
  mainArray.shift(); // удаление заглавия таблицы
  const vowelCities = [];
  const consonantCities = [];

  mainArray.forEach(value => { // проверка на начальную букву и пуш в массив
    vowels.some(letter => letter === value[1].toLowerCase().charAt(0)) ?
      vowelCities.push(value) : consonantCities.push(value);
  });
  return { vowelCities, consonantCities };
};

const summate = array => // вывод кол-ва населения
  array.reduce((sum, val) => sum + normalizeNumber(val[2]), 0);



// -----разделяю массив и пишу в 2 файла----- //
const consonantCities = divide().consonantCities;
const vowelCities = divide().vowelCities;

fs.writeFile('consonantCities.json', JSON.stringify(consonantCities),
  () => { });

fs.writeFile('vowelCities.json', JSON.stringify(vowelCities),
  () => { });

// -----вывожу сумму населения----- //
console.log('В городах с названиями на гласную букву живёт \x1b[31m',
  summate(vowelCities),
  '\x1b[0m человек.');

console.log('В городах с названиями на согласную букву живёт \x1b[31m',
  summate(consonantCities),
  '\x1b[0m человек.');
console.log('Все массивы записаны в JSON');

console.timeEnd('Время выполнения кода'); // время выполнения кода
