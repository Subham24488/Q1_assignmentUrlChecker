var express = require('express');
var app = express();
const cors = require('cors')

// middlewares
app.use(cors())
app.use(express.json())

function monitorUrlFunct(url, email){

    let success = 0;
    let faliures = 0;
    
    for (var i = 0; i<5; i++){
      
       function test(i) {
       const inter = setTimeout(() => {
          console.log(success, faliures, i);
          
          //checking the faliures rate
          if(faliures > 3){
            console.log("look an error!@!!!");
            delay(inter)
            sendMail(email, url)
            return 1;
          }
          axios.get(`${url}`)
          .then(()=> {
            //checking the success rate
              if(success === 200) return 0;
            success++;
          }).catch(err =>{
            faliures++;
          })
        },i*2000);
      }
    
     test(i);
  }
}

//stoping the interval timer
function delay(i){
    clearTimeout(i)
    }

app.get('/monitorurl', async function(req, res){
    const url = req.query.url;
    const email = req.query.email;

    let status = await monitorUrlFunct(url, email);
    
    if(status === 0){
        res.send("OK")
    }
    else{
        res.send("FAILED")
    }
    
})
app.listen(5000, () => {
    console.log("server listening on port 5000");
})