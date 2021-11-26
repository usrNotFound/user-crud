import React from "react";
import Error from "./Error";

const AddressForm = ({data, errors, setData, children}) => {
    return (
        <>
            <div>
                <label htmlFor="address_line_1" className="block text-sm font-medium text-gray-700">
                    Address Line 1
                </label>
                <div className="mt-1">
                    <input
                        id="address_line_1"
                        name="address_line_1"
                        type="address_line_1"
                        autoComplete="address_line_1"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={data?.address_line_1}
                        onChange={e => setData('address_line_1', e.target.value)}
                    />
                    {errors && <Error>{errors?.address_line_1}</Error>}
                </div>
            </div>

            <div>
                <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">
                    Address Line 1
                </label>
                <div className="mt-1">
                    <input
                        id="address_line_2"
                        name="address_line_2"
                        type="address_line_2"
                        autoComplete="address_line_2"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={data?.address_line_2}
                        onChange={e => setData('address_line_2', e.target.value)}
                    />
                </div>
            </div>

            <div className="md:flex -mx-4">
                <div className="flex-1 px-4">
                    <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">
                        Suburb
                    </label>
                    <div className="mt-1">
                        <input
                            id="suburb"
                            name="suburb"
                            type="suburb"
                            autoComplete="suburb"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data?.suburb}
                            onChange={e => setData('suburb', e.target.value)}
                        />
                        {errors && <Error>{errors?.suburb}</Error>}
                    </div>
                </div>

                <div className="flex-1 px-4">
                    <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">
                        Postcode
                    </label>
                    <div className="mt-1">
                        <input
                            id="postcode"
                            name="postcode"
                            type="postcode"
                            autoComplete="postcode"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data?.postcode}
                            onChange={e => setData('postcode', e.target.value)}
                        />
                        {errors && <Error>{errors?.postcode}</Error>}
                    </div>
                </div>
            </div>

            <div className="md:flex -mx-4">
                <div className="flex-1 px-4">
                    <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">
                        State
                    </label>
                    <div className="mt-1">
                        <input
                            id="state"
                            name="state"
                            type="state"
                            autoComplete="state"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data?.state}
                            onChange={e => setData('state', e.target.value)}
                        />
                        {errors && <Error>{errors?.state}</Error>}
                    </div>
                </div>

                <div className="flex-1 px-4">
                    <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <div className="mt-1">
                        <input
                            id="country"
                            name="country"
                            type="country"
                            autoComplete="country"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data?.country}
                            onChange={e => setData('country', e.target.value)}
                        />
                        {errors && <Error>{errors?.country}</Error>}
                    </div>
                </div>
            </div>
            {children}
        </>
    );
};

export default AddressForm;
