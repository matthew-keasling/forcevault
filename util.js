const fs = require('fs');
const path = require('path');

function Util(){}

Util.prototype.getFiles = (dir => {
  var files = [];
  try{
    fs.readdirSync(dir).forEach(file => {
      var fp = path.join(dir,file);
      var s = fs.statSync(fp);
      if(s.isFile()){
        files.push(fp);
      } else if(s.isDirectory()){
        Util.getFiles(fp).forEach(subFile => {
          files.push(subFile);
        });
      }
    });
  }catch(err){
    console.log(err);
  }
  return files;
})

module.exports = new Util();
