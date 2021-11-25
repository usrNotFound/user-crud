import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm as mockedUseForm } from '@inertiajs/inertia-react';
import Create from './Create';

jest.mock('@inertiajs/inertia-react', () => ({
    InertiaLink: ({ children }) => children,
    InertiaHead: () => <></>,
    useForm: jest.fn().mockImplementation(() => ({
        data: {},
        post: jest.fn(),
        setData: jest.fn(),
        clearErrors: jest.fn(),
        errors: {}
    })),
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('Register/Index', () => {
    it('renders', () => {
        render(<Create/>);
    });

    it('allows to create register user', async () => {
        const onSubmit = jest.fn();
        const setData = jest.fn();

        mockedUseForm.mockImplementationOnce(() => ({
            post: onSubmit,
            data: {},
            setData,
            clearErrors: jest.fn(),
            errors: {}
        }));

        render(<Create/>);

        userEvent.type(document.getElementById('first_name'), 'mc');
        userEvent.type(document.getElementById('last_name'), 'testy');
        userEvent.type(document.getElementById('email'), 'test@mctest.com');
        userEvent.type(document.getElementById('password'), 'password');
        userEvent.type(document.getElementById('password_confirmation'), 'password');

        await act(async () => userEvent.click(screen.getByRole('button', { name: /Register/i })));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('/register');

        expect(setData).toHaveBeenCalledWith('first_name', 'mc');
        expect(setData).toHaveBeenCalledWith('last_name', 'testy');
        expect(setData).toHaveBeenCalledWith('email', 'test@mctest.com');
        expect(setData).toHaveBeenCalledWith('password', 'password');
        expect(setData).toHaveBeenCalledWith('password_confirmation', 'password');
    });

    it('shows error message', () => {

        mockedUseForm.mockImplementationOnce(() => ({
            post: jest.fn(),
            data: {},
            setData: jest.fn(),
            clearErrors: jest.fn(),
            errors: {
                first_name: 'Please enter your first name',
                last_name: 'Please enter your last name',
                email: 'Please enter your email',
                password: 'Please enter your password',
            },
        }));
        render(<Create/>);
        expect(screen.getByText(/Please enter your first name/)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your last name/)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your email/)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your password/)).toBeInTheDocument();
    });
});
