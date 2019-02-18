const fse = require('fs-extra');
const inquirer = require('inquirer');
const cp = require('child_process');
const path = require('path');


inquirer.prompt([
  {
    name:'name',
    message:'What would you like to name your project?',
    type: 'String',
  },{
    name:'dependencies',
    message:'What dependencies would you like to install for your project?',
    type: 'String',
  },{
    name: 'template',
    message: 'What template would you like to start with?',
    type: 'list',
    choices: [
      'album',
      'pricing',
      'checkout',
      'product',
      'cover',
      'carousel'
    ]
  }
]).then(function(answer){
  fse.mkdirs(answer.name, function(err){
    if (err){
      console.error(err);
    } else {
        try{
          process.chdir(answer.name);
          console.log("Project initiating.");
          let deps = answer.dependencies.split(' ');
          deps.forEach(function(dep){
            cp.exec("npm install " + dep, console.log(dep + " installing."));
          });
          (function copyBootstrapTemplate(type){
            if (type == "album" || null){
              fse.copy(path.join(__dirname, 'templates/album.html'), 'public/index.html', function(err){
                if (err) return console.error(err);
              });
            }
            if (type=="pricing"){
              fse.copy(path.join(__dirname, 'templates/pricing.html'), 'public/index.html', function(err){
                if (err) return console.error(err);
              });
            }
            if (type=="checkout"){
              fse.copy(path.join(__dirname, 'templates/checkout.html'), 'public/index.html', function(err){
                if (err) return console.error(err);
              });
            }
            if (type=="product"){
              fse.copy(path.join(__dirname, 'templates/product.html'), 'public/index.html', function(err){
                if (err) return console.error(err);
              });
            }
            if (type=="cover"){
              fse.copy(path.join(__dirname, 'templates/cover.html'), 'public/index.html', function(err){
                if (err) return console.error(err);
              });
            }
            if (type=="carousel"){
              fse.copy(path.join(__dirname, 'templates/carousel.html'), 'public/index.html', function(err){
                if (err) return console.error(err);
              });
            }
          })(answer.template);
          fse.copy(path.join(__dirname, 'server.js'), 'index.js', function(err){
            if (err) return console.error(err);
          });
        } catch(err){
          console.error(err);
        }
    }
  });
});
