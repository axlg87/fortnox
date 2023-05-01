import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Card from '../../components/Card';
import axios from '../../utils/Axios';
import { formatPrice } from '../../utils/Formaters';

const columns = [
    { header: 'Id', prop: 'id' },
    { header: 'Car model', prop: 'carModel' },
    { header: 'Car make', prop: 'carMake' },
    { header: 'Renter name', prop: 'renterName' },
    { header: 'Renter Age', prop: 'renterAge' },
    { header: 'Pickup date', prop: 'pickupDate' },
    { header: 'Return date', prop: 'returnDate' },
    { header: 'Total price', prop: 'totalPrice', format: formatPrice },
];

interface RentalRecord {
    [key: string]: string;
}
export default function AdminMain() {
    const [tableData, setTableData] = useState<RentalRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        axios.get('/rent-car')
            .then(({ data }) => {
                setTableData(data);
                setIsLoading(false);
            })
            .catch(() => {
                setErrorMsg('Error fetching data from API');
                setIsLoading(false);
            });
    }, []);
    return (
        <div className="admin">
            <Card>
                {isLoading && <p>Loading data...</p>}
                {errorMsg && <p>{errorMsg}</p>}
                {!isLoading && !errorMsg && (
                    <>
                        <div className="mb-4">
                            <Table
                                className="mb-0"
                                columns={columns}
                                data={tableData}
                            />
                        </div>

                        <h5>Total revenue: {formatPrice(tableData.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0))}</h5>
                    </>
                )}
            </Card>
        </div>
    );
}
