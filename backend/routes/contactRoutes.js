const express = require("express");
const { getContact, createContact, getContacts, updateContact, deleteContact } = require("../controller/contactController");

const router= express.Router();

// this snippet helps us to get any route from server.js with initial endpoint /api/contactApp
// router.route("/").get((req,res)=>{
//     res.send("I am up")
// });

// router.route("/").post((req,res)=>{
//     res.json({message:"post Data"})
// });

// router.route("/:id").put((req,res)=>{
//     res.json({message:`Update Data ${req.params.id}`})
// });

// router.route("/:id").get((req,res)=>{
//     res.json({message:`Get Data of ${req.params.id}`})
// });

// router.route("/:id").delete((req,res)=>{
//     res.json({message:`delete Data ${req.params.id}`})
// });

// Updating all above code using controllers

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.route("/").post(createContact);   ---> these below thre lines can be written as above ase wea re using same route
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);


module.exports= router