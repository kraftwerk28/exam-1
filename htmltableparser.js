'use strict';

const tableToJSON = require('tabletojson');
const fs = require('fs');

tableToJSON.convertUrl(
  'https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population',
  // { useFirstRowForHeadings: true },
  { stripHtmlFromCells: true },
  data => {
    fs.writeFileSync('table2.json', JSON.stringify(data));
  }
)
