import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card';
import DatePicker from '../../components/DatePicker';
import CostComponent from './CostComponent';
import axios from '../../utils/Axios';
import { isSameDateOrBefore } from '../../utils/DateFunctions';

interface RentFormData {
    carModel: string;
    renterName: string;
    renterAge: number;
    pickupDate: string;
    returnDate: string;
}


interface AvailableCarsResponse {
    data: {
        make: string;
        model: string;
        price: number;
    };
}

interface Car {
    make: string;
    model: string;
    title: string;
}
export default function RentCar() {

    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car>();
    const [pickupDate, setPickupDate] = useState<Date>(new Date());
    const [returnDate, setReturnDate] = useState<Date>(getReturnDate(new Date()));
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [submiting, setSubmitting] = useState(false);

    useEffect(() => {
        axios.get('/rent-car/available-cars')
            .then(({ data }: AvailableCarsResponse) => {

                if (!Array.isArray(data)) {
                    return false;
                }

                const cars = data.map((car) => ({
                    make: car.make,
                    model: car.model,
                    title: `${car.make} ${car.model}, ${car.price}kr`,
                }));
                setCars(cars);
                setSelectedCar(cars[0]);

                return true;
            })
            .catch(() => {
                setError('Error fetching data from API');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    function getReturnDate(date: Date): Date {
        const initialReturnDate = new Date(date);
        initialReturnDate.setDate(initialReturnDate.getDate() + 1);
        return initialReturnDate;
    }

    function handleSetPickupDate(date: Date) {
        if (isSameDateOrBefore(returnDate, getReturnDate(date))) {
            setReturnDate(getReturnDate(date));
        }
        setPickupDate(date)
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmitting(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const renterName = formData.get('driver-name') as string;
        const renterAge = parseInt(formData.get('driver-age') as string);

        if (!selectedCar) return false;

        axios.post<RentFormData>('/rent-car', {
            carMake: selectedCar.make,
            carModel: selectedCar.model,
            renterName: renterName,
            renterAge: renterAge,
            pickupDate: pickupDate.toJSON(),
            returnDate: returnDate.toJSON()
        })
            .then(function (response) {
                console.log(response);
                alert("Car rental complete!")
            })
            .catch(function (error) {
                console.log(error);
                alert("An error occured!")
            }).finally(() => {
                setSubmitting(false);
            });

        return true;
    }

    if (loading || !selectedCar) return <div className="w-100 text-center">Loading...</div>;

    if (error.length) return <div className="w-100 text-center">{error}</div>;

    return (
        <div className="rent-car d-flex justify-content-md-center">
            <Card className="col-xl-4">
                <Form className="w-100" onSubmit={onSubmit}>
                    <Form.Group className="mb-4" controlId="car-select">
                        <Form.Label>Which car you want to rent?</Form.Label>
                        <Form.Select
                            aria-label="car"
                            required={true}
                            name="car-select"
                            value={selectedCar.title}
                            onChange={(event) => setSelectedCar(cars.find(d => d.title === event.target.value))}>
                            {cars.map((car, i) => <option key={i} value={car.title}>{car.title}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Row className="d-flex">
                        <Col>
                            <Form.Group className="mb-4" controlId="pickup-date">
                                <Form.Label>Which date you want to pick up the car?</Form.Label>
                                <DatePicker selected={pickupDate} onChange={handleSetPickupDate} minDate={new Date()} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-4" controlId="return-date">
                                <Form.Label>Which date you want to return the car?</Form.Label>
                                <DatePicker selected={returnDate} onChange={setReturnDate} minDate={getReturnDate(pickupDate)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <CostComponent startDate={pickupDate} endDate={returnDate} car={selectedCar.title} />
                    </div>

                    <Form.Group className="mb-4" controlId="driver-name">
                        <Form.Label>Name of driver</Form.Label>
                        <Form.Control
                            name="driver-name"
                            type="text"
                            aria-describedby="driver-name-help-block"
                            required
                            pattern="[A-Za-z]+"
                            title="Please enter a valid name"
                        />
                        <Form.Text id="driver-name-help-block" muted>
                            Name of the driver that will use the car.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="driver-age">
                        <Form.Label>Age of driver</Form.Label>
                        <Form.Control
                            name="driver-age"
                            type="number"
                            aria-describedby="driver-age-help-block"
                            required
                            min={18}
                        />
                        <Form.Text id="driver-age-help-block" muted>
                            Age of the driver that will use the car.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={submiting}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    )
}