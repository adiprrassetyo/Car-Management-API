const { Car } = require("../models");

// list all cars where deleted false
exports.listCar = async (req, res) => {
  try {
    const cars = await Car.findAll({
      where: {
        deleted: false,
      },
    });
    res.send({
      message: "List of cars",
      data: cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
    });
  }
};

// create car
exports.createCar = async (req, res) => {
  const car = {
    name: req.body.name,
    price: req.body.price,
    deleted: false,
    createdBy: req.user.email,
  };
  try {
    const newCar = await Car.create({
      name: car.name,
      price: car.price,
      deleted: false,
      created_by: car.createdBy,
    });
    res.status(201).json({
      message: "Car Created",
      data: car,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update car by id
exports.updateCar = async (req, res) => {
  const car = {
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    deleted: false,
    updatedBy: req.user.email,
  };
  try {
    const updatedCar = await Car.update(
      {
        name: car.name,
        price: car.price,
        deleted: false,
        updated_by: car.updatedBy,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Car Updated",
      data: car,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete car by id
exports.deleteCar = async (req, res) => {
  const car = {
    id: req.params.id,
    deleted: true,
    deletedBy: req.user.email,
  };
  try {
    const deletedCar = await Car.update(
      {
        deleted: true,
        deleted_by: car.deletedBy,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Car Deleted",
      data: car,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
