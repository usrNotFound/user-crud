import React from "react";
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
    it('renders children', () => {
        render(<Error>Error Message</Error>);
        expect(screen.getByText('Error Message')).toBeInTheDocument();
    });
});
