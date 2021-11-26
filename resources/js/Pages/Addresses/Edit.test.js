import React from 'react';
import { act, render, screen } from "@testing-library/react";
import { useForm as mockedUseForm } from "@inertiajs/inertia-react";
import userEvent from "@testing-library/user-event";
import Edit from "./Edit";


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
const address = {
    id : 1,
    address_line_1 : 'Some Random Address ',
    'country' : 'Australia',
    'suburb' : 'Somewhere',
    'postcode' : 4209,
    'state' : 'QLD'
};
describe('Address/Create', () => {
    it('renders', () => {
        render(<Edit address={address} user={{id : 2}}/>);
    });

    it('allows to update address', async () => {
        const onSubmit = jest.fn();
        const setData = jest.fn();

        mockedUseForm.mockImplementationOnce(() => ({
            patch : onSubmit,
            data : {},
            setData,
            clearErrors : jest.fn(),
            errors : {}
        }));

        render(<Edit address={address} user={{id : 3}}/>);

        userEvent.type(document.getElementById('address_line_1'), 'McTesty Lane');
        userEvent.type(document.getElementById('suburb'), 'Testy Ville');

        await act(async () => userEvent.click(screen.getByRole('button', {name : /Update/i})));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('/users/3/addresses/1');

        expect(setData).toHaveBeenCalledWith('address_line_1', 'McTesty Lane');
        expect(setData).toHaveBeenCalledWith('suburb', 'Testy Ville');
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

        render(<Edit address={address} user={{id : 3}}/>);

        expect(screen.getByText(/Please enter your suburb/)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your postcode/)).toBeInTheDocument();
    });
});
