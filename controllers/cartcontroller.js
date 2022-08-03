import { itemDetails } from "../models/db.js";

const readcartitems = (req, res) => {
    // express.request.body

    // let sql = "";
    // if (req.body.ids.length === 0)
    //     sql = null;
    // else {
    //     for (let index = 0; index < req.body.ids.length; index++) {
    //         if (index === 0)
    //             sql = "?"
    //         else
    //             sql = sql + ", ?"
    //     }
    // }

    // if (req.body.ids.length > 0){
    //     let idArr = [];
    //     for (let index = 0; index < req.body.ids.length; index++) {{
    //         idArr.push({name: })
    //     }
    // }
    //    console.log(req.body.ids);
    itemDetails.find({refId: req.body.ids}, function (err, items) {
        if (err) {
            console.log("error query @ readcartitems: ");
            console.log(err);
            res.status(403).json({ "status": false, "message": "cart items download failed" })
        }
        else {
            // console.log(items);
            console.log("cart items downloaded sussessfully")
            res.status(200).json(items)
        }
    })
}

export default readcartitems;