package com.example.rental;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;

@Entity
@Table(name = "car_rental")
public class CarRental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "car_make")
    private String carMake;

    @Column(name = "car_model")
    private String carModel;

    @Column(name = "renter_name")
    private String renterName;

    @Column(name = "renter_age")
    @Min(value = 18, message = "Renter age must be at least 18 years old.")
    private Integer renterAge;

    @Column(name = "pickup_date")
    private LocalDate pickupDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setCarMake(String carMake) {
        this.carMake = carMake;
    }

    public String getCarMake() {
        return carMake;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setRenterName(String renterName) {
        this.renterName = renterName;
    }

    public String getRenterName() {
        return renterName;
    }

    public void setRenterAge(Integer renterAge) {
        this.renterAge = renterAge;
    }

    public Integer getRenterAge() {
        return renterAge;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    @Override
    public String toString() {
        return "CarRental{" +
                "id=" + id +
                ", carModel='" + carModel + '\'' +
                ", renterName='" + renterName + '\'' +
                ", renterAge=" + renterAge +
                ", pickupDate=" + pickupDate +
                ", returnDate=" + returnDate +
                '}';
    }
}