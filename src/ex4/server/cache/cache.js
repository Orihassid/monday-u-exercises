import  fs  from "fs";
import path from "path";
import rimraf from "rimraf";

export default function autoDeleteCache() {

  const cacheDir = "./server/DB";
  const cacheFileName = "cache.json";
  fs.readdir(cacheDir, function (err, files) {
    files.forEach(function (file, index) {
      fs.stat(path.join(cacheDir, cacheFileName), function (err, stat) {
        
        if (err) {
          return console.error(err);
        }
        setTimeout(()=>{
            return rimraf(path.join(cacheDir, cacheFileName), function (err) {
                if (err) {
                  return console.error(err);
                }
                console.log("cache file deleted");
              });

        },60000)
     
      });
    });
  });
}
