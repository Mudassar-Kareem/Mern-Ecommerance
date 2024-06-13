import { TryCatch } from "../middleware/error.js";
import { User } from "../models/User.js";
import { Order } from "../models/order.js";
import { products } from "../models/product.js";
import { percentCalculate } from "../utils/features.js";

export const getAdminStats = TryCatch(async (req, res, next) => {
  const today = new Date();
  const sixMonthAge = new Date();
  sixMonthAge.setMonth(sixMonthAge.getMonth() - 6)
  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };
  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };
  // Product promise
  const thisMonthProductPromise = products.find({
    createdAt:{
        $gte:thisMonth.start,
        $lte:thisMonth.end
    }
  });
  const lastMonthProductPromise = products.find({
    createdAt:{
        $gte:lastMonth.start,
        $lte:lastMonth.end
    }
  });

  //User promise
  const thisMonthUserPromise = User.find({
    createdAt:{
        $gte:thisMonth.start,
        $lte:thisMonth.end
    }
  });
  const lastMonthUserPromise = User.find({
    createdAt:{
        $gte:lastMonth.start,
        $lte:lastMonth.end
    }
  });

  //order promise
  const thisMonthOrderPromise = Order.find({
    createdAt:{
        $gte:thisMonth.start,
        $lte:thisMonth.end
    }
  });
  const lastMonthOrderPromise = Order.find({
    createdAt:{
        $gte:lastMonth.start,
        $lte:lastMonth.end
    }

  });

  const lastSixMonthOrderPromise = Order.find({
  createdAt:{
        $gte:sixMonthAge,
        $lte:today
    }
  });

  const latestTranscationPromise = Order.find({}).select(["orderItems", "discount", "total", "status"]).limit(4)

  const [
    thisMonthProduct,
    thisMonthUser,
    thisMonthOrder,
    lastMonthProduct,
    lastMonthUser,
    lastMonthOrder,
    productCount,
    userCount,
    allOrder,
    lastSixMonthOrder,
    categories,
    femaleUserCount,
    latestTranscation
  ] = await Promise.all([
    thisMonthProductPromise,
    thisMonthUserPromise,
    thisMonthOrderPromise,
    lastMonthProductPromise,
    lastMonthUserPromise,
    lastMonthOrderPromise,
    products.countDocuments(),
    User.countDocuments(),
    Order.find({}).select("total"),
    lastSixMonthOrderPromise,
    products.distinct("category"),
    User.countDocuments({gender : "female"}),
    latestTranscationPromise
  ]);

  const thisMonthRenvue= thisMonthOrder.reduce((total,order)=> total + (order.total || 0),0);
  const lastMonthRenvue= lastMonthOrder.reduce((total,order)=> total + (order.total || 0),0);

  const percentChange={
    revenue: percentCalculate(thisMonthRenvue,lastMonthRenvue),
    product: percentCalculate(thisMonthProduct.length,lastMonthProduct.length),
    user: percentCalculate(thisMonthUser.length,lastMonthUser.length),
    order: percentCalculate(thisMonthOrder.length, lastMonthOrder.length)
  };
  
  const revenue= allOrder.reduce((total,order)=> total+ (order.total || 0),0)

  const count ={
    revenue,
     product: productCount,
     user: userCount,
     order: allOrder.length
  }

  const orderMonthCount = new Array(6).fill(0);
  const orderMonthRevenue=new Array(6).fill(0);
  lastSixMonthOrder.forEach((order)=>{
      const creationDate = order.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
      if (monthDiff < 6) {
        orderMonthCount[6 - monthDiff - 1] += 1;
        orderMonthRevenue[6 - monthDiff - 1] += order.total;
      }
  })
  const categoriesCountPromise = categories.map((category) =>
    products.countDocuments({ category })
  );

  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];

  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: Math.round((categoriesCount[i] / productCount) * 100),
    });
  });

  const userRatio = {
    male: userCount - femaleUserCount,
    female: femaleUserCount
  };
  const modifiedLatestTransaction = latestTranscation.map((i) => ({
    _id: i._id,
    discount: i.discount,
    amount: i.total,
    quantity: i.orderItems.length,
    status: i.status,
  }));


const stats  ={modifiedLatestTransaction, categoryCount, percentChange, count, chart:{order:orderMonthCount, revenue: orderMonthRevenue}, userRatio};

return res.status(200).json({
    success:true, stats
})

});


export const pieChart = TryCatch(async(req,res,next)=>{

  const allOrderPromise= Order.find({}).select(["total","subtotal","shippingCharges", "discount","tax"])
  const [processingOrder,shippingOrder,deliverdOrder,categories,productCount,outOfStock,allOrder,allUser,admin,user] = await Promise.all([
    Order.countDocuments({status: "processing"}),
    Order.countDocuments({status: "shipping"}),
    Order.countDocuments({status: "deliverd"}),
    products.distinct("category"),
    products.countDocuments(),
    products.countDocuments({stock : 0}),
    allOrderPromise,
    User.find({}).select(["dob"]),
    User.countDocuments({role : "admin"}),
    User.countDocuments({role : "user"}),
  ]);
  const categoriesCountPromise = categories.map((category) =>
    products.countDocuments({ category })
  );

  const categoriesCount = await Promise.all(categoriesCountPromise);

  const productRatio: Record<string, number>[] = [];

  categories.forEach((category, i) => {
    productRatio.push({
      [category]: Math.round((categoriesCount[i] / productCount) * 100),
    });
  });

  const stockAvablity = {
    inStock:productCount - outOfStock, outOfStock
  }


  const orderRatio = {
    processingOrder, shippingOrder,deliverdOrder, 
  }

  const grossIncome = allOrder.reduce(
    (prev, order) => prev + (order.total || 0),
    0
  );

  const discount = allOrder.reduce(
    (prev, order) => prev + (order.discount || 0),
    0
  );
  const  productionCost= allOrder.reduce(
    (prev, order) => prev + (order.shippingCharges || 0),
    0
  );
  const  burnt= allOrder.reduce(
    (prev, order) => prev + (order.tax || 0),
    0
  );
  const markingCost = Math.round(grossIncome * (20/100));
  const netMargin = grossIncome - discount - productionCost - burnt - markingCost;

  const revenueRatio ={
     grossIncome , discount , productionCost , burnt , markingCost,netMargin 
    
  }

  const userAgeRatio = {
    teen:allUser.filter((i)=>i.age <20).length,
    adult:allUser.filter((i)=> i.age>=20 && i.age<40).length,
    old:allUser.filter((i)=>i.age >40).length
  }

  const adminCustomer ={
    admin,
    customer:user
  }

  const charts = { orderRatio,productRatio,stockAvablity, revenueRatio,userAgeRatio,adminCustomer};
  return res.status(200).json({
    success:true, charts
  })

});


export const barChart= TryCatch(async(req,res,next)=>{
  const today = new Date();
  const sixMonthAgo = new Date();
  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
  const tewlveMonthAgo = new Date();
  tewlveMonthAgo.setMonth(tewlveMonthAgo.getMonth() - 12);

  const sixMonthProductPromise = products.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  }).select("createdAt");
  const sixMonthUserPromise = User.find({
    createdAt:{
      $gte:sixMonthAgo,
      $lte:today,
    },
  }).select("createdAt");

  const tewlveMonthAgoOrderPromise = Order.find({
    createdAt:{
      $gte:tewlveMonthAgo,
      $lte:today
    }
  }).select("createdAt");
  const [product,user,order] = await Promise.all([sixMonthProductPromise,sixMonthUserPromise,tewlveMonthAgoOrderPromise]);
  const  sixMonthproduct = new Array(6).fill(0);
  product.forEach((i)=>{
    const creationDate = i.createdAt
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
    if(monthDiff <6 ){
      sixMonthproduct[6 - monthDiff - 1] += 1;
    }
  })

  const  sixMonthUser = new Array(6).fill(0);
  user.forEach((z)=>{
    const creationDate = z.createdAt
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
    if(monthDiff <6 ){
      sixMonthUser[6 - monthDiff - 1] += 1;
    }
  })

  const twelveMothOrder  = new Array(12).fill(0);
  order.forEach((i)=>{
    const creationDate= i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12)%12;
    if(monthDiff<12){
      twelveMothOrder[12 - monthDiff -1] +=1
    }
  })

  const charts = {
    Product : sixMonthproduct,
    user: sixMonthUser,
    order:twelveMothOrder
  }

  return res.status(200).json({
    success:true, charts
  })

})


export const lineChart = TryCatch(async(req,res,next)=>{
  const today = new Date;
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
  
  const baseQuary = {
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: today,
    },
  };

  const [product,user,order] = await Promise.all([
    products.find(baseQuary).select("createdAt"),
    User.find(baseQuary).select("createdAt"),
    Order.find(baseQuary).select(["createdAt" , "total" , "discount"])
  ])

  const productCount  = new Array(12).fill(0);
  product.forEach((i)=>{
    const creationDate= i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12)%12;
    if(monthDiff<12){
      productCount[12 - monthDiff -1] +=1
    }
  })

  const userCount  = new Array(12).fill(0);
  user.forEach((i)=>{
    const creationDate= i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12)%12;
    if(monthDiff<12){
      userCount[12 - monthDiff -1] +=1
    }
  })

  const discount  = new Array(12).fill(0);
  order.forEach((i)=>{
    const creationDate= i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12)%12;
    const property = "discount";
    if(monthDiff<12){
      if(property){discount[12 - monthDiff -1] +=i[property]}
      else{
        discount[12 - monthDiff -1] +=1
      }
    }
  })

  const total  = new Array(12).fill(0);
  order.forEach((i)=>{
    const creationDate= i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12)%12;
    const property = "total";
    if(monthDiff<12){
      total[12 - monthDiff -1] +=1
    }
  })

  const charts ={
    product:productCount,
    user:userCount,
    discount, total
  }
  return res.status(200).json({
    success: true,
    charts
  })
})