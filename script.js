const https = require('https');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 4000;

const url = "https://jsonplaceholder.typicode.com/posts";

   https.get(url, res => {
      let data = [];
      
      res.on('data', chunk => {
         data.push(chunk);
      });

      res.on('end', () => {
         const posts = JSON.parse(Buffer.concat(data).toString());

         let baseDir = path.join(__dirname, '/result'); //Set directory
         const post = JSON.stringify(posts); //convert to json
         
         //Write to result directory
         fs.writeFile(`${baseDir}/posts.json`, post, function(err) {
            if(err) return console.log(err);
            console.log(`Posts saved in ${baseDir}/posts.json`);
         })

      });
   }).on('error', err => {
     console.log('Error: ', err.message); //Catch errors
   });