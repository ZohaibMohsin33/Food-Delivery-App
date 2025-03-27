
export const displayData = (req,res)=>{

    try{
        console.log(global.food_item);
        res.send({
            success : true,
            data : [global.food_item,global.food_category]
        })
    }
    catch(err){
        res.send({success : false})
    }

}