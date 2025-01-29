const fs = require('fs');
const { readFile, writeFile } = require('fs/promises');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😓');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write to the file!');
      resolve('Success!');
    });
  });
};

// ASYNC AWAIT

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

    const imgs = all.map(el => el.body.message);

    console.log(imgs);

    await writeFilePro('dog-image.txt', imgs.join('\n'));
    console.log('Random dog img saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY!';
};

//using async await

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR!!!');
  }
})();

/*
using then and catch 

console.log('1: Will get dog pics!');
// const x = getDogPic(); if we want the function to return smth, we need to use the .then() method on it.
// console.log(x);
getDogPic().then((x) => {
  console.log(x);
  console.log('3: Done getting dog pics!');
}).catch(err => {
    console.log("ERROR!!!")
})
*/

//------------------------------------------------------------------------------------------------------------

// PROMISES

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePro('dog-image.txt', res.body.message);
  })
  .then(() => {
    console.log('random dog img saved to file');
  })
  .catch((err) => {
    console.log(err.message);
  });
  */

//---------------------------------------------------------------------------------------------

//CALLBACK HELL

/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);
      fs.writeFile('dog-image.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('random dog img saved to file');
      });
    });

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      fs.writeFile('dog-image.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('random dog img saved to file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/
