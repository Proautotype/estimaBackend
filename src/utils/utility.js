function randomName(){
    return Math.floor(Math.random(1)*5000);
  }

function enlistEmptyProperties(body){
  const results = [];
  Object.entries(body).map((propValue,index)=>{
    if(propValue[1] == ""){
      results.push(propValue[0] + " is empty");
    }
  })
  return results;
}

module.exports = {
  enlistEmptyProperties,
  randomName
}