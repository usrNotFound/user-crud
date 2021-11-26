import React from "react";
import { render, screen } from "@testing-library/react";
import AddressList from "./AddressList";

describe('AddressList', () => {
    it('renders', () => {
        render(<AddressList address={{
            address_line_1 : 'Address Line 1',
            address_line_2 : 'Address Line 2',
            suburb : 'Suburb',
            state : 'QLD',
            country : 'Country',
        }}>Buttons</AddressList>);

        expect(screen.getByText('Address Line 1')).toBeInTheDocument();
        expect(screen.getByText('Address Line 2')).toBeInTheDocument();
        expect(screen.getByText('Suburb')).toBeInTheDocument();
        expect(screen.getByText('QLD')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('Buttons')).toBeInTheDocument();
    });
});
