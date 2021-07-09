const jsonfile = require('jsonfile')

module.exports = {
    writeDuration:  (duration= 0 ) => {
return new Promise((resolve, reject) => {
 
    let data;

    try {
        data = jsonfile.readFileSync("./public/room.json");
      if(data.duration!= duration){  data.duration = duration;
        jsonfile.writeFileSync("./public/room.json", data);
    }

    resolve(`The durtion now is ${data.duration} seconds`)
    }
    catch(err) {
        reject({
            code: err.code,
            message: err.message})
    }
})



    }
}