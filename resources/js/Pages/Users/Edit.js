import React from 'react';
import Error from "../../Components/Error";
import { BeatLoader } from "react-spinners";
import { useForm } from "@inertiajs/inertia-react";

const Edit = ({user}) => {
    const {data, setData, patch, processing, errors, clearErrors} = useForm({
        first_name : user.first_name,
        last_name : user.last_name,
        email : user.email,
        password : '',
    });

    const handleSubmit = async e => {
        e.preventDefault();
        patch('/my-profile');
    };
    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Update your details
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl">

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST" onChange={clearErrors}>

                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Personal Information</h3>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200">
                        </div>
                        <div className="md:flex -m-4">
                            <div className="p-4 flex-1">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="first_name"
                                        autoComplete="first_name"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                    />
                                    {errors.first_name && <Error>{errors?.first_name}</Error>}
                                </div>
                            </div>
                            <div className="p-4 flex-1">
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="last_name"
                                        autoComplete="last_name"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                    />
                                    {errors.last_name && <Error>{errors?.last_name}</Error>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <Error>{errors?.email}</Error>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                />
                                {errors.password && <Error>{errors?.password}</Error>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />
                                {errors.password_confirmation && <Error>{errors?.password_confirmation}</Error>}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200"/>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 border border-transparent flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium hover:bg-indigo-700 justify-center md:flex-none px-4 py-2 rounded-md shadow-sm text-sm text-white"
                                disabled={processing}
                            >
                                {processing && (
                                    <BeatLoader color="#FFF"/>
                                )}
                                {!processing &&
                                <span>Update</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;
