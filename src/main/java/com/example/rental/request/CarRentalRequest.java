package com.example.rental.request;

import java.time.LocalDate;
import javax.validation.constraints.Min;

public class CarRentalRequest {
    private String carMake;
    private String carModel;
    private String renterName;

    @Min(value = 18, message = "Renter age must be at least 18 years old.")
    private Integer renterAge;

    private LocalDate pickupDate;
    private LocalDate returnDate;

    public String getCarMake() {
        return carMake;
    }

    public void setCarName(String carMake) {
        this.carMake = carMake;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getRenterName() {
        return renterName;
    }

    public void setRenterName(String renterName) {
        this.renterName = renterName;
    }

    public Integer getRenterAge() {
        return renterAge;
    }

    public void setRenterAge(Integer renterAge) {
        this.renterAge = renterAge;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
}