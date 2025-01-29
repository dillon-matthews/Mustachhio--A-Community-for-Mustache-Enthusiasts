const ContactRequest = require("../models/ContactRequest");

exports.getContact = (req, res, { loggedIn, user }) => {
  res.render("contact", {
    pageTitle: "Contact",
    path: "/contacts/new",
    loggedIn,
    user: user || {},
  });
};

exports.getContactList = async (req, res) => {
  try {
    const contacts = await ContactRequest.find({ response: null });
    res.render("contact-list", {
      pageTitle: "Contact List",
      contacts,
      path: "/contacts",
      loggedIn: req.session.isAuthenticated,
      user: req.session.user || {},
    });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send("An error occurred");
  }
};

exports.createContact = async (req, res, { loggedIn, user }) => {
  try {
    const { name, email, message, phone, address } = req.body;
    await ContactRequest.create({ name, email, message, phone, address });
    res.render("thanks", {
      pageTitle: "Thank You!",
      path: "/contacts/new",
      loggedIn,
      user: user || {},
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getEditContact = async (req, res, { loggedIn, user }) => {
  const { id } = req.params;
  try {
    const contact = await ContactRequest.findById(id);
    res.render("contact-respond", {
      pageTitle: `${contact.name} - edit`,
      contact,
      path: `/contacts/${id}/edit`, 
      loggedIn,
      user: user || {},
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.editContact = async (req, res, { loggedIn, user }) => {
  const { id } = req.params;
  const { response } = req.body;
  try {
    const contact = await ContactRequest.findById(id);
    contact.response = response;
    contact.dateResponded = new Date();
    await contact.save();
    res.render("contact-respond", {
      pageTitle: `${contact.name} - edit`,
      contact,
      path: `/contacts/${id}/edit`, 
      loggedIn,
      user: user || {},
    });
  } catch (e) {
    console.log("error: ", e);
  }
};