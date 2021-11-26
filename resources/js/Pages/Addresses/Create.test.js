import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm as mockedUseForm } from '@inertiajs/inertia-react';
import Create from "./Create";

jest.mock('@inertiajs/inertia-react', () => ({
    InertiaLink : ({children}) => children,
    InertiaHead : () => <></>,
    useForm : jest.fn().mockImplementation(() => ({
        data : {},
        post : jest.fn(),
        setData : jest.fn(),
        clearErrors : jest.fn(),
        errors : {}
    })),
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('Address/Create', () => {
    it('renders', () => {
        render(<Create/>);
    });

    it('allows to login in', async () => {
        const onSubmit = jest.fn();
        const setData = jest.fn();

        mockedUseForm.mockImplementationOnce(() => ({
            post : onSubmit,
            data : {},
            setData,
            clearErrors : jest.fn(),
            errors : {}
        }));

        render(<Create user={{id : 3}}/>);

        userEvent.type(document.getElementById('address_line_1'), 'test@mctest.com');
        userEvent.type(document.getElementById('address_line_2'), 'secret');
        userEvent.type(document.getElementById('suburb'), 'southport');
        userEvent.type(document.getElementById('postcode'), '4209');
        userEvent.type(document.getElementById('country'), 'australia');

        await act(async () => userEvent.click(screen.getByRole('button', {name : /Add Address/i})));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('/users/3/addresses');

       expect(setData).toHaveBeenCalledWith('address_line_1', 'test@mctest.com');
       expect(setData).toHaveBeenCalledWith('address_line_2', 'secret');
       expect(setData).toHaveBeenCalledWith('suburb', 'southport');
       expect(setData).toHaveBeenCalledWith('postcode', '4209');
       expect(setData).toHaveBeenCalledWith('country', 'australia');
    });

    it('shows error message', () => {

        mockedUseForm.mockImplementationOnce(() => ({
            post : jest.fn(),
            data : {},
            setData : jest.fn(),
            clearErrors : jest.fn(),
            errors : {
                suburb : 'Please enter your suburb',
                postcode : 'Please enter your postcode',
            },
        }));
        render(<Create/>);
        expect(screen.getByText(/Please enter your suburb/)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your postcode/)).toBeInTheDocument();
    });
});
