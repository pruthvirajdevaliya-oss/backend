const asynchendler =(fn)=>{
    return (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((err)=>{
        res.status(err.code||500).json({
            success:false,
            message:err.message
            
        })
        next(err)
    })

    
    
}}


export {asynchendler}
// const asynchendler = (fn) => {()=>{}}
//     const asynchendler = (fn) => async (req,res,next)=>{
//   try{await fn(req,res,next)

//   }
//   catch(error){
//     res.status(err.code||500).json({
//         success:false,
//         message:err.message
//     })
//   }
//     }
