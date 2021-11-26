import React from 'react';
import { render, screen } from "@testing-library/react";
import AddressForm from "./AddressForm";

describe('AddressFrom', () => {
    it('renders', () => {
        render(<AddressForm/>);

        expect(screen.getByText('Suburb')).not.toBeNull();
        expect(screen.getByText('Country')).not.toBeNull();
        expect(screen.getByText('State')).not.toBeNull();
        expect(screen.getByText('Postcode')).not.toBeNull();
    });
});
