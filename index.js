const express=require('express');
const uuid=require("uuid");
const app=express();

app.use(express.urlencoded());


app.use(express.json());



const { v4: uuidv4 } = require('uuid'); 

app.get("/",function(req,res){
    
    res.send("Hey API is working!!");
});

const rModel=require('./models/reimbursements');

    


app.post("/reimbursements",async function(req,res){
    let{user_id,description,amount,currency}=req.body;

    let user= await rModel.findOne({user_id:user_id, description:description});
    // console.log(user.created_at);
    // if(user!= null){

    //     if(user.created_at - Date() <=1){
    //         res.send("Same request not possible under 24 hours!! please wait to request again")
    //     }
    // }  Not working due to wrng fromat in both dates
    let r=await rModel.create({
        user_id:user_id,
        reimbursement_id:uuidv4(),
        amount:amount,
        description:description,
        status:"pending",
        currency:currency,
        created_at:Date()
    });

    // if(currency !="USD " && currency!="INR"){
    //     res.send("wrong currency . choose USD or INR")
    // }



    res.send(r);
});


app.get("/reimbursements/:user_id",async function(req,res){
    const { user_id } = req.params;
    console.log(user_id);
    let user= await rModel.find({user_id:user_id});
    let total_amount=0;
    console.log(user[0]);
    if(user.length==0){
        res.send("No user_id found!!");
    }

    else{
        for (i=0;i<user.length;i++){
            if (user[i].currency=="INR"){  // i.amount is not working
                console.log(user[i].amount);
                total_amount=total_amount+(user[i].amount/80);
            }
            else{  // i.amount is not working
                console.log(user[i].amount);
                total_amount=total_amount+user[i].amount;
            }
        }
        const response={
            user_id:user_id,
            total_amount:total_amount,
            currency:"USD"
        }
        res.send(response);
    }
    
})


app.listen(5000,function(req,res){
    console.log("Server is running in port number 5000");
})
