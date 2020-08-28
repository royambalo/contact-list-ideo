const express = require('express');
const router = express.Router();
const { contactSchema, validcontact } = require("../moddels/contact_model");

router.get('/', function (req, res,) {
    contactSchema.find({})
        .sort({ _id: -1 })
        .then(data => {
            res.json(data)
        })
});
router.get('/single/:id', (req, res, next) => {

    contactSchema.findOne({ _id: req.params.id })
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.status(400).json(err)
        })
});
router.post("/add", async (req, res) => {
    let dataBody = req.body;
    if (req.body.phoneNumber.length == 10 && req.body.phoneNumber[0] == "0")
        req.body.phoneNumber = req.body.phoneNumber.substring(1);
    let contact = await validcontact(dataBody);
    if (contact.error) {
        res.status(400).json(contact.error.details[0])
    }
    else {
        try {
            let saveDate = await contactSchema.insertMany([req.body]);
            res.json(saveDate[0]);
        }
        catch{
            res.status(400).json({ message: "error insert new contact,probaly the Email adress you typed is already in use" })
        }
    }
})
router.post("/edit", async (req, res) => {
    let dataBody = req.body;
    if (req.body.phoneNumber.length == 10 && req.body.phoneNumber[0] == "0")
        req.body.phoneNumber = req.body.phoneNumber.substring(1);
    let contact = await validcontact(dataBody);
    if (contact.error) {
        res.status(400).json(contact.error.details[0])
    }
    else {
        try {
            let updateData = await contactSchema.updateOne({ _id: req.body._id }, req.body)
            res.json(updateData)
        }
        catch{
            res.status(400).json({ message: "cant find id" })
        }
    }
})
router.post("/del", (req, res) => {
    let delID = req.body._id;
    contactSchema.deleteOne({ _id: delID })
        .then(data => {
            if (data.deletedCount > 0) {
                res.json({ massage: "deleted", del: "ok" })
            }
            else {
                res.status(400).json({ error: "id not found" })
            }
        })
})

module.exports = router;
