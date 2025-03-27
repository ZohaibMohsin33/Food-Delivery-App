import ordersModel from "../model/orders.model.js";

export const orderData = async (req, res) => {
    let email = req.body.email;
    let data = req.body.order_data;

    // Add the order_date at the beginning of the order_data array
    await data.splice(0, 0, { order_date: req.body.order_date });

    // Check if the email already exists in the database
    let eid = await ordersModel.findOne({ email });

    if (eid === null) {
        // If no record is found for this email, create a new one
        try {
            await ordersModel.create({
                email,
                order_data: [data] // Wrapping data in an array
            });
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err });
        }
    } else {
        // If the email already exists, update the record by pushing the new order_data
        try {
            await ordersModel.findOneAndUpdate(
                { email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err });
        }
    }
};


export const myOrders = async (req,res)=>{
    const {email} = req.body;


    try{
        let response = await ordersModel.findOne({email});
        if(response === null){
            res.status(200).json({success : true, msg : "Data not found",data : {}})
        }
        else{
            res.status(200).json({success : true, data : response.order_data})
        }
    }
    catch(err){
        res.json({success : false,msg:err})
    }
}