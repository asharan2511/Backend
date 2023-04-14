import asyncHandler from "express-async-handler"; // as we async await returns and promise and it needs to be passed through try and catch block
// thus express-async-handler helps to get rid of those blocks rather it checks itself
import Contact from "../model/contactModel.js";

//@desc Get all contacts
//@route api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find(); // this finds all the data stored in the collection
  res.json(contacts);
});

//@desc create new contacts
//@route POST api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body; // destructing all the schema with the help of req.body, into their respective fields
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }

  const contacts = await Contact.create({
    //using model name for using the method of mongoose to create the collection
    name,
    email,
    phone,
  });
  res.json(contacts);
});

//@desc Get new contacts
//@route GET api/contacts/:id
//@access public

const getContacts = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

//@desc PUT new contacts
//@route PUT api/contacts/:id
//@access public

const putContacts = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete new contacts
//@route Delete api/contacts/:id
//@access public

const deleteContacts = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const deleteContacts = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `The contact has been deleted with the id ${req.params.id}`,
  });
});

export default getContact;
export { createContact, getContacts, putContacts, deleteContacts };
