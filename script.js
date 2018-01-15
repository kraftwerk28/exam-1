'use strict';

const htmlParser = require('htmlparser');
const http = require('http');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const fs = require('fs');

const xhr = new XMLHttpRequest();
let response = '';

const hphandler = new htmlParser.DefaultHandler((err, result) => {
  if (err) throw err;
  else
    console.log(result[2]
      .children[3]
      .children[5]
      .children[8]
      .children[7]
      .children[0]
      .children.find(el => el.name === 'table')
      .children[1]
      .children
      .forEach(el => {
        // if (el.children)
        //   console.log(el.children)
        if (el.children)
          el.children
            .forEach(el => {
              // console.log(el.data);
              if (el.data)
                console.log(el.data);
            })
      })
      // .children[0].data
    );
});

const parser = new htmlParser.Parser(hphandler);

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    parser.parseComplete(xhr.responseText);
  }
}

xhr.open('GET',
  'https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population');
xhr.send();
