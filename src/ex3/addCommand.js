


function validation(item) {
    const arr = item.split(/\s*,\s*/);
    let flag = false;
    arr.forEach((element) => {
      if (isNum(element)) {
        return;
      }
      flag = true;
    });
    return { isPokemon: flag, arr: arr };
  }
  
  
   function isNum(val) {
    return !isNaN(val);
  }



  module.exports = {
    validation:validation,
   
}