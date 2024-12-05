
import { CarModel } from "../car/car.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";



const createOrderIntoDb = async (order: Order) => {
  const { car, quantity } = order;

  // Find the car in inventory
  const carData = await CarModel.findById(car);

  if (!carData) {
    throw new Error("Car not found in inventory");
  }

  if (carData.quantity === undefined) {
  throw new Error("Car quantity is not defined");
  }


  if (carData.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  // Reduce the quantity and update inStock flag
  carData.quantity -= quantity;
  if (carData.quantity === 0) {
    carData.inStock = false;
  }
  await carData.save();

  // Create the order
  const result = await OrderModel.create(order);

  return result;
};

const calculateRevenue = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $lookup: {
        from: "cars", // Collection for car models
        localField: "car",
        foreignField: "_id",
        as: "carDetails",
      },
    },
    {
      $unwind: "$carDetails",
    },
    {
      $project: {
        quantity: { $toDouble: "$quantity" }, // Ensure quantity is a number
        carPrice: { $toDouble: "$carDetails.price" }, // Ensure price is a number
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ["$quantity", "$carPrice"] },
        },
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0;
};


export const OrderServices = {
  createOrderIntoDb,
  calculateRevenue
};