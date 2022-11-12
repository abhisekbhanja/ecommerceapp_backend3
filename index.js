const express=require("express");
const app=express();

const cors=require("cors");
const mongoose=require("mongoose");
const route=require("./Routes/routes")
const Razorpay = require('razorpay');

app.use(express.json())

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });




mongoose.connect(process.env.DB_URL,
{
    useNewUrlParser: true,
   
    useUnifiedTopology: true,
  }
,(err)=>{
    if(err){console.log("database not connected!!"+err)}
    else{console.log("database connected")
  console.log("//////////////////////////////////////")
  }
})

app.use(cors());
app.use("/",route);

//for razorpay
const razorpayInstance = new Razorpay({

	// Replace with your key_id
	key_id: process.env.KEY_ID,

	// Replace with your key_secret
	key_secret: process.env.API_KEY
});

app.post('/order',(req,res)=>{
    //console.log("order by client "+req.body.total)

    var options = {
         amount: req.body.total*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      razorpayInstance.orders.create(options, function(err, order) {
        //console.log(order);
        res.json(order)
      });
})







//for port
const port=process.env.PORT || 7000


app.listen(port,()=>{
  const date = new Date();
    console.log("server started at: "+port+ " at "+date.toLocaleTimeString()+" "+date.toLocaleDateString())
    console.log("loading....");
})
