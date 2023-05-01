package com.example.rental;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CarRepository carRepository;

    @Autowired
    public DataInitializer(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) {
        // Check if entries already exist
        if (carRepository.count() == 0) {
            // Create some sample cars
            createCar("Volvo", "S60", "1500");
            createCar("Volkswagen", "Golf", "1333");
            createCar("Ford", "Mustang", "3000");
            createCar("Ford", "Transit", "2400");
        }
    }

    private void createCar(String make, String model, String price) {
        Car car = new Car();
        car.setMake(make);
        car.setModel(model);
        car.setPrice(new BigDecimal(price));
        carRepository.save(car);
    }
}