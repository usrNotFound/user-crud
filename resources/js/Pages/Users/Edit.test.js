import React from 'react';
import Edit from "./Edit";
import { act, render, screen } from "@testing-library/react";
import { useForm as mockedUseForm } from "@inertiajs/inertia-react";
import userEvent from "@testing-library/user-event";

jest.mock('@inertiajs/inertia-react', () => ({
    InertiaLink : ({children}) => children,
    InertiaHead : (children) => <>{children}</>,
    useForm : jest.fn().mockImplementation(() => ({
        data : {},
        patch : jest.fn(),
        setData : jest.fn(),
        clearErrors : jest.fn(),
        errors : {}
    })),
}));

const user = {
    first_name : 'first',
    last_name : 'last',
    email : 'email@test.com',
};
describe('User/Edit', function () {
    it('renders', function () {
        render(<Edit user={{user, ...{addresses : []}}}/>);
    });

    it('allows to update details', async () => {
        const onSubmit = jest.fn();
        const setData = jest.fn();

        mockedUseForm.mockImplementationOnce(() => ({
            patch : onSubmit,
            data : {},
            setData,
            clearErrors : jest.fn(),
            errors : {}
        }));

        render(<Edit user={{user, ...{addresses : []}}}/>);

        userEvent.type(document.getElementById('first_name'), 'first');
        userEvent.type(document.getElementById('last_name'), 'last');
        userEvent.type(document.getElementById('email'), 'test@mctest.com');

        await act(async () => userEvent.click(screen.getByRole('button', {name : /update/i})));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('/my-profile');

        expect(setData).toHaveBeenCalledWith('email', 'test@mctest.com');
        expect(setData).toHaveBeenCalledWith('first_name', 'first');
        expect(setData).toHaveBeenCalledWith('last_name', 'last');
    });

    it('show address empty error message when user does not have any addresses', function () {
        render(<Edit user={{user, ...{addresses : []}}}/>);

        expect(screen.getByText(/No address found in your profile./)).toBeInTheDocument();
    });

    it('shows list of address', function () {
        render(<Edit user={{
            user, ...{
                addresses : [
                    {
                        id : 1,
                        address_line_1 : 'Some Random Address ',
                        'country' : 'Australia',
                        'suburb' : 'Somewhere',
                        'postcode' : 4209,
                        'state' : 'QLD'
                    }
                ]
            }
        }}
        />);

        expect(screen.getByText(/Some Random Address/)).toBeInTheDocument();
        expect(screen.getByText(/Australia/)).toBeInTheDocument();
        expect(screen.getByText(/Somewhere/)).toBeInTheDocument();
        expect(screen.getByText(/QLD/)).toBeInTheDocument();
    });

    it('shows edit and delete buttons', function () {
        render(<Edit user={{
            user, ...{
                addresses : [
                    {
                        id : 1,
                        address_line_1 : 'Some Random Address ',
                        'country' : 'Australia',
                        'suburb' : 'Somewhere',
                        'postcode' : 4209,
                        'state' : 'QLD'
                    }
                ]
            }
        }}
        />);

        expect(screen.getByText(/Edit/)).toBeInTheDocument();
        expect(screen.getByText(/Delete/)).toBeInTheDocument();
    });
});
