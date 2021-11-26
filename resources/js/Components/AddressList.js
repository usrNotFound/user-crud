import React from 'react';

const AddressList = ({address, children}) => (
    <div className="flex py-6">
        <div className="flex-1">
            {address.address_line_1}
        </div>
        <div className="flex-1">
            {address.address_line_2}
        </div>
        <div className="flex-1">
            {address.suburb}
        </div>
        <div className="flex-1">
            {address.postcode}
        </div>
        <div className="flex-1">
            {address.state}
        </div>
        <div className="flex-1">
            {address.country}
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

export default AddressList;
