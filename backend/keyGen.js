const request = require('request-promise-native');
const fses = require('fs').promises;

(async () => {
  var x;
  var arr = [];
  for (x = 0; x < 1; x++) {
    var s = await request.get(
      'http://localhost:8000/addkey?admin=381f1c60-279e-4b3b-b75c-f65af90ae458&uses=3'
    );
    await sleep(100);
    arr.push(s);
  }
  console.log(s);
  await fses.writeFile('./teseshsst.txt', JSON.stringify(arr));
  //
  // arr=[]
  //
  // for(x=0;x<200;x++){
  // var s =await request.get("http://localhost:8000/addkey?admin=381f1c60-279e-4b3b-b75c-f65af90ae458&uses=5")
  // await sleep(100)
  // arr.push(s)
  // }
  // await fses.writeFile("./five.txt", JSON.stringify(arr))
  //
  // arr=[]
  //
  // for(x=0;x<200;x++){
  // var s =await request.get("http://localhost:8000/addkey?admin=381f1c60-279e-4b3b-b75c-f65af90ae458&uses=10")
  // await sleep(100)
  // arr.push(s)
  // }
  // await fses.writeFile("./ten.txt", JSON.stringify(arr))
  //
  // arr=[]
  //
  // for(x=0;x<50;x++){
  // var s =await request.get("http://localhost:8000/addkey?admin=381f1c60-279e-4b3b-b75c-f65af90ae458&uses=25")
  // await sleep(100)
  // arr.push(s)
  // }
  // await fses.writeFile("./twentyfive.txt", JSON.stringify(arr))
  //
  //
  // arr=[]
  //
  // for(x=0;x<50;x++){
  // var s =await request.get("http://localhost:8000/addkey?admin=381f1c60-279e-4b3b-b75c-f65af90ae458&uses=50")
  // await sleep(100)
  // arr.push(s)
  // }
  // await fses.writeFile("./fifty.txt", JSON.stringify(arr))
  //
  //
  // arr=[]
  //
  // for(x=0;x<50;x++){
  // var s =await request.get("http://localhost:8000/addkey?admin=381f1c60-279e-4b3b-b75c-f65af90ae458&uses=100")
  // await sleep(100)
  // arr.push(s)
  // }
  // await fses.writeFile("./hundred.txt", JSON.stringify(arr))

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
})();
