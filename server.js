const express = require("express")
const fs = require("fs");
const app = express()
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//JSON archive route
const filePath = 'messages.json';
let messages = [];

//load JSON
function loadMessages (){
    if (fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath);
        messages = JSON.parse(data);
    }
}

//save files JSON
function saveMessages (){
    fs.writeFileSync(filePath, JSON.stringify(messages,null,2));
}

loadMessages();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/newMessage', (req, res) => {
    res.sendFile(__dirname + "/public/newMessage.html");
});

app.post('/newMessage',(req,res)=>{
    const{user,text} = req.body; //take data from form
    
    if (user && text){
        messages.push({
            text,
            user,
            added: new Date()
        });

        saveMessages();
        res.redirect('/'); //redirect to principal page
    }
    else{
        res.status(400).send('form uncompleted');
    }
})

//send messages as JSON file
app.get('/messages', (req, res) => {
    res.json(messages); 
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

/*code walktrough
this line of code redirects to pages
app.get('page name', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

POST route for form details and add a message to array
app.post('/newMessage',(req,res)=>{
    const{user,text} = req.body; //take data from form
    
    if (user && text){
        messages.push({
            text,
            user,
            added: new Date()
        });

        saveMessages();
        res.redirect('/'); //redirect to principal page
    }
    else{
        res.status(400).send('form uncompleted');
    }
})

send messages as JSON file
app.get('/messages', (req, res) => {
    res.json(messages); 
});
*/