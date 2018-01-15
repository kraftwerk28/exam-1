'use strict';

const fs = require('fs');

console.log(
  JSON.parse(
    fs.readFileSync('table2.json', 'utf8')
  )
);
