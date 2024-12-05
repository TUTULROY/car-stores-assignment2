"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarControllers = void 0;
const car_services_1 = require("./car.services");
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { car: carData } = req.body;
        const result = yield car_services_1.CarServices.createCarIntoDB(carData);
        res.status(200).json({
            success: true,
            message: 'Car is created successfully ',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield car_services_1.CarServices.getSingleCarFromDB(carId);
        res.status(200).json({
            success: true,
            message: 'Cars is retrieved successfully ',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield car_services_1.CarServices.getAllCarsFromDB();
        res.status(200).json({
            success: true,
            message: 'Cars are retrieved successfully ',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.CarControllers = {
    createCar,
    getAllCars,
    getSingleCars,
};
