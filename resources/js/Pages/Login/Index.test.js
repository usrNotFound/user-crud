import React from 'react';
import Index from "./Index";
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm as mockedUseForm } from '@inertiajs/inertia-react';

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

describe('Login/Index', () => {
    it('renders', () => {
        render(<Index />);
    });

    it('allows to login in', async () => {
        const onSubmit = jest.fn();
        const setData = jest.fn();

        mockedUseForm.mockImplementationOnce(() => ({
            post: onSubmit,
            data: {},
            setData,
            clearErrors: jest.fn(),
            errors: {}
        }));

        render(<Index />);

        userEvent.type(document.getElementById('email'), 'test@mctest.com');
        userEvent.type(document.getElementById('password'), 'secret');

        await act(async () => userEvent.click(screen.getByRole('button', { name: /Sign in/i })));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('/login');

        expect(setData).toHaveBeenCalledWith('email', 'test@mctest.com');
        expect(setData).toHaveBeenCalledWith('password', 'secret');
    });

    it('shows error message', () => {

        mockedUseForm.mockImplementationOnce(() => ({
            post: jest.fn(),
            data: {},
            setData: jest.fn(),
            clearErrors: jest.fn(),
            errors: {
                email: 'Please enter your email',
                password: 'Please enter your password',
            },
        }));
        render(<Index />);
        expect(screen.getByText(/Please enter your email/)).toBeInTheDocument();
        expect(screen.getByText(/Please enter your password/)).toBeInTheDocument();
    });
});
