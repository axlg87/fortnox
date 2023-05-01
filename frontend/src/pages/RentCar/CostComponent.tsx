import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/Formaters';

interface CostComponentProps {
    startDate: Date;
    endDate: Date;
    car: string;
}

export default function CostComponent({ startDate, endDate, car }: CostComponentProps) {
    const [cost, setCost] = useState(0);
    const [days, setDays] = useState(0)

    useEffect(() => {
        const days = getNumberOfDays(startDate, endDate);
        const match = car.match(/,\s*(\d+)/);
        const price = match ? parseInt(match[1]) : 0; // provide a default value if no match is found

        setDays(days);
        setCost(days * price);
    }, [startDate, endDate, car]);

    function getNumberOfDays(startDate: Date, endDate: Date): number {
        const oneDayInMs = 1000 * 60 * 60 * 24; // Number of milliseconds in one day
        const startDateInMs = startDate.getTime();
        const endDateInMs = endDate.getTime();
        const diffInMs = endDateInMs - startDateInMs;
        const diffInDays = Math.round(diffInMs / oneDayInMs);
        return diffInDays;
    }

    return (
        <div className="cost-component">
            You will rent the car for {days} days and the cost will be: {formatPrice(cost)}
        </div>
    );
}