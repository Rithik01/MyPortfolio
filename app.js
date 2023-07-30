const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const nodemailer = require('nodemailer')
const { getMaxListeners } = require('process')
const app = express()
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname, "./public")
const viewPath = path.join(__dirname, "./views")



app.set("view engine", "hbs")
app.set("views", viewPath)
app.use(express.static(staticPath))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render("index")
} )

app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/contact', (req, res) => {
    res.render("contact")
})

app.get("/education", (req, res) => {
    res.render("education")
})

app.get("/services", (req, res) => {
    res.render("services")
})

app.get("/projects", (req, res) => {
    res.render("projects")
})


app.get("*", (req, res) => {
    res.send("Page not found")
})

app.post("/send", (req, res) => {
    // console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone Number: ${req.body.tel}</li>
    <li>Your Message: ${req.body.message}</li>
    </ul>
`;
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "coty.konopelski@ethereal.email",// generated ethereal user
      pass: "Fm24zFC57kbewPC1ZK", // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: '"Rithik Guleria 👻" <coty.konopelski@ethereal.email>', // sender address
    to: "rithikguleria3161@gmail.com", // list of receivers
    subject: "Hello Rithik Guleria", // Subject line
    text: "Hello Rithik", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render("contact", {msg:"Email has been sent"})

})




app.listen(3000, () => {
    console.log(`Listening on the port number ${port}`);
})



