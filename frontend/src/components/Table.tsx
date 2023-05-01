import classNames from 'classnames';
import React from 'react';
import { Table as ReactTable } from 'react-bootstrap';

interface Props {
    className?: string;
    columns: Array<{ header: string; prop: string; format?: Function; }>;
    data: { [key: string]: string | number }[];
}

function Table({ className, columns, data }: Props) {
    const classes = classNames(className);

    return (
        <ReactTable className={classes} striped bordered hover>
            <thead>
                <tr>
                    {columns.map((column, i) => (
                        <th key={i}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={`row-${index}`}>
                        {columns.map((column, i) => <td key={i}>{column.format ? column.format(row[column.prop]) : row[column.prop]}</td>)}
                    </tr>
                ))}
            </tbody>
        </ReactTable>
    );
}

export default Table;
