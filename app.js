const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/Listing.js");
const path = require("path");


// mongoose URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// connect with mongo db. wanderlust is DB name
main()
    .then(() => {
        console.log("connected to DB");
     })
    .catch((err) => {
         console.log(err);s
});

// for database
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

// request and response API to 8080;
app.get("/", (req, res) => {
    res.send("Hello Universe");
});

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My new Villa",
        description: "by the beach",
        price: 1000,
        location: "goa",
        country: "india"
    });

    await sampleListing.save();
    console.log("sample saved");
    res.send("successful testing");
});




// index route
app.get("/listings", async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
    
});

// new listing
app.get("/listings/new" , (req, res) =>{
    res.render("listings/new.ejs");
});


// show route
app.get("/listings/:id", async (req, res) =>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

// create route
app.post("/listings", async(req, res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

});




//listen post 8080
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});