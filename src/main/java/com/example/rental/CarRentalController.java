package com.example.rental;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.rental.exceptions.CarNotFoundException;
import com.example.rental.request.CarRentalRequest;

@RestController
@RequestMapping("/rent-car")
public class CarRentalController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarRentalController.class);

    private final CarRentalRepository carRentalRepository;

    private final CarRepository carRepository;

    @Autowired
    public CarRentalController(CarRentalRepository carRentalRepository, CarRepository carRepository) {
        this.carRentalRepository = carRentalRepository;
        this.carRepository = carRepository;
    }

    @PostMapping
    public void rentCar(@Valid @RequestBody CarRentalRequest carRentalRequest) {

        LOGGER.info("Renting car for {}", carRentalRequest.getRenterName());

        CarRental carRental = new CarRental();
        carRental.setCarMake(carRentalRequest.getCarMake());
        carRental.setCarModel(carRentalRequest.getCarModel());
        carRental.setRenterName(carRentalRequest.getRenterName());
        carRental.setRenterAge(carRentalRequest.getRenterAge());
        carRental.setPickupDate(carRentalRequest.getPickupDate());
        carRental.setReturnDate(carRentalRequest.getReturnDate());

        // Query the Car table to get the car with the specified model
        Car car = carRepository.findByModel(carRentalRequest.getCarModel());

        if (car == null) {
            // Handle the case where the specified car model is not found
            LOGGER.error("Could not find car with model {}", carRentalRequest.getCarModel());
            throw new CarNotFoundException("Could not find car with model " + carRentalRequest.getCarModel());
        }

        // Calculate the number of days between pickup and return dates
        long days = ChronoUnit.DAYS.between(carRentalRequest.getPickupDate(), carRentalRequest.getReturnDate());

        // Calculate the total rental price based on the number of days and the car's
        // price per day
        BigDecimal totalPrice = car.getPrice().multiply(BigDecimal.valueOf(days));

        carRental.setTotalPrice(totalPrice);

        carRentalRepository.save(carRental);

        LOGGER.info("Saved car rental record: {}", carRental.toString());
    }

    @GetMapping
    public List<CarRental> getAllCarRentals() {

        LOGGER.info("Getting car rentals");

        return carRentalRepository.findAll();
    }

    @GetMapping("/available-cars")
    public List<Car> getAvailableCars() {

        LOGGER.info("Getting available cars");

        return carRepository.findAll();
    }
}