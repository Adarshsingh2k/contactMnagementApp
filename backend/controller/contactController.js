const asyncHandler= require("express-async-handler");
const Contact= require("../models/contactModel")


const getContacts =asyncHandler(async(req,res)=>{
  const contacts = await Contact.find({ user_id: req.user.id });

    res.status(200).json(contacts)
})

const createContact=asyncHandler(async(req,res)=>{
    
    console.log(req.body)
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(401)
        throw new Error(" Not Valid ")
    }
   
    const contact=await Contact.create({name,email,phone,user_id: req.user.id, })
    res.status(201).json(contact)
});

const getContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact= asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    
    if(!contact){
        console.log(error);
        res.status(404);
        throw new Error("Not Valid ID")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    
    res.status(200).json(updatedContact)
})

const deleteContact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    
    if(!contact){
        console.log(error);
        res.status(404);
        throw new Error("Not Valid ID")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
})





module.exports ={getContact,createContact,getContacts,updateContact,deleteContact}