import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
//const port = process.env.PORT || 7000

const port=3000;
const app = express();
app.use(express.json())
const array = [
    {
        id: 1,
        name: "Ananya",
        age: 20
    },
    {
        id: 2,
        name: "Anokhi",
        age: 18
    },
    {
        id: 3,
        name: "Akshara",
        age: 18
    }
]

app.get("/", (req, res) => {
    res.status(200).send(`listening on port ${port}`)
})


app.get("/user", (req, res) => {
    try {
        res.status(200).json({
            message: "data recieved",
            userData: array
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})
app.get("/user/:id", (req, res) => {
    try {
        const { id } = req.params;      
        const user=userData.find((u) => u.id==id);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({
            message: "data recieved",
            userData: user
        })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})


app.post("/create" , (req,res)=>{
    try{
        const {name , age} = req.body ;
        const newUser = {
            id: array.length+1,
            name,
            age,
        };
        array.push(newUser);
        console.log("User added successfully")
        console.log(array)
        res.status(201).json({
            message: "User created successfully",
            userData: newUser
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})
app.put ("/edit/:id", (req, res) => {   
    try{
        const { id } = req.params;
        const { name, age } = req.body;
        const Index = array.findIndex((u) => u.id == id);   
     if (Index == -1) {
        return res.status(404).json({ message: "User not found" });
    }
    userData [index]={
        id,
        name,
        age,    
    } ;  
 return res.status(200).json({
        message: "User updated successfully",
    }); 
    
} catch (err) {
    console.error(err.message);
    res.status(500).json({
        message: "Internal server error"
    });
}
});
app.delete("/delete/:id", (req, res) => {
    try{
        const { id } = req.params;
        const { name, age } = req.body;
        const Index = array.findIndex((u) => u.id == id);   
     if (Index == -1) {
        return res.status(404).json({ message: "User not found" });
    }
    userData [index]={
        id,
        name,
        age,    
    } ;  
 return res.status(200).json({
        message: "User updated successfully",
    }); 
    
} catch (err) {
    console.error(err.message);
    res.status(500).json({
        message: "Internal server error"
    });
}
});      


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

app.get("/user/:id", (req, res) => {
    try {
        const { id } = req.params;
        const user = array.find((u) => u.id == id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User found",
            userData: user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }       
 });