const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';   //we can give any name which keeps secretly 

const app = express();


app.use(express.json());
app.use(cors());

//without token
// app.post("/register", async (req, resp) => {
//     let user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();     //to delete password field in register api
//     delete result.password
//     resp.send(result)
// })   
 

//with token register API

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();     //to delete password field in register api
    delete result.password

    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "something went worng , Please try after some time" })
        }
        resp.send({ result, auth: token })
    })
}
)


app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");    //select use to remove password filed in result
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "something went worng , Please try after some time" })
                }
                resp.send({ user, auth: token })
            })
        }
        else {
            resp.send({ result: "No user found" })
        }
    }
    else {
        resp.send({ result: "No user found" })
    }

})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
})


// app.get("/products", async(req,resp)=>{
//     let products = await Product.find();
//     if(products.length>0)
//         {
//             resp.send(products)
//         }
//         else{
//             resp.send({result:"No Products Found"})     //it will show all products which are available in database 
//         }
// })

app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    }
    else {
        resp.send({ result: "No Products Found" })
    }
})


app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
})

app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No record Found" })
    }
})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
})

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    resp.send(result)
})

function verifyToken(req, resp, next) {
    let token = req.headers["authorization"]
    if (token) {
        token = token.split(' ')[1];
        console.log("middleware called if", token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send("Please provide valid token")
            } else {
                next();
            }
        })
    } else {
        resp.status(403).send("Please add token with header")
    }
    console.log("middleware called", token)

}


app.listen(5000);