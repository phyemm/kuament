/**用于修改制定目录下文件的后缀名 */
let fs = require("fs");

let oldSuffix = "geojson";
let newSuffix = "json";
let dirPath = "./test";
fs.readdir(dirPath, function (err, data) {
  if (err) {
    throw Error(err);
  } else {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      //   console.log(element);
      var tmp = element.split(",");
      if (tmp.length > 1) {
        if (tmp[1] == oldSuffix) {
          var oldName = dirPath + "/" + element;
          var newName = dirPath + "/" + tmp[0] + "." + newSuffix;
          fs.rename(oldName, newName, (err) => {
            if (err) {
              throw Error(err);
            } else {
              console.log("修改成功");
            }
          });
        }
      }
    }
  }
});
