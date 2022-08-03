import { itemDetails } from "../models/db.js";

const addItem = (req, res) => {

    const itemObj = {
        refId: new Date().toUTCString(),
        modelName: req.body.ModelName,
        subCategory: req.body.SubCategory,
        brand: req.body.Brand,
        breif: req.body.Breif,
        power: req.body.Power,
        price: req.body.Price,
        imageUrl: req.body.ImageUrl,
        onStage: req.body.onStage,
        openStage: req.body.OpenStage,
        paSystem: req.body.PaSystem,
        illuminary: req.body.Illuminary,
        powerSystem: req.body.PowerSystem
    }

    itemDetails.create(itemObj, function (err, items) {
        if (err) {
            console.log("error @ create new item: ");
            console.log(err)
            res.status(500).json({ "status": false, "message": "Items uploading failed" })
        }
        else {
            // console.log("Number of affectedRows: " + result.affectedRows);
            console.log("new item added")
            res.status(200).json({ "status": true, "message": "Items uploaded success" })
        }
    });
}

const readItem = (req, res) => {
    // express.request.body
    // const itemObj = req.body;
    // console.log(req.body)

    itemDetails.find({}, function (err, items) {
        if (err) {
            console.log("error query @ readitem: ");
            console.log(err);
            res.status(403).json({ "status": false, "message": "Items download failed" })
        }
        else {
            // console.log("Number of affectedRows: " + result.affectedRows);
            console.log("items downloaded sussessfully")
            res.status(200).json(items)
        }
    })
}

const readSingleItem = (req, res) => {
    // express.request.body
    // const refId = req.body;
    // console.log(req.body.id);
    itemDetails.findOne({ "refId": req.body.id }, function (err, item) {
        if (err) {
            console.log("error query @ read single item: ");
            console.log(err);
            res.status(403).json({ "status": false, "message": "single item download failed" })
        }
        else {
            // console.log(item);
            console.log("single item downloaded sussessfully")
            res.status(200).json(item)
        }
    });
}

export default addItem;
export { readItem, readSingleItem };