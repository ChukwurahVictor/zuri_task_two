const https = require('https');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 4000;

const url = "https://jsonplaceholder.typicode.com/posts";

   https.get(url, res => {
      let data = [];
      
      res.on('data', chunk => {
         // console.log(chunk);
         data.push(chunk);
         // data += chunk //Push chunk into data array
      });

      res.on('end', () => {
         // const posts = JSON.parse(data);
         const posts = JSON.parse(Buffer.concat(data).toString()); //Convert data to json and save in posts
         console.log(posts);

         //Write to result directory
         let baseDir = path.join(__dirname, '/result');
         fs.writeFile(`${baseDir}/posts.txt`, posts, function(err) {
            if(err) return console.log(err);
            console.log(`Posts saved in ${baseDir}/posts.json`);
         })

      });
   }).on('error', err => {
     console.log('Error: ', err.message); //Catch errors
   });