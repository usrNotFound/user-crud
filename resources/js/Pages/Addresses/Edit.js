import React from "react";
import AddressForm from "../../Components/AddressForm";
import { BeatLoader } from "react-spinners";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

const Edit = ({address, user}) => {

    const {data, setData, patch, processing, errors, clearErrors} = useForm({
        address_line_1 : address.address_line_1,
        address_line_2 : address.address_line_2,
        suburb : address.suburb,
        state : address.state,
        country : address.country,
        postcode : address.postcode
    });

    const handleSubmit = async e => {
        e.preventDefault();
        patch(`/users/${user.id}/addresses/${address.id}`);
    };

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Add Address to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST" onChange={() => clearErrors()}>
                        <AddressForm data={data} setData={setData} errors={errors}>
                            <div className="flex justify-end">
                                <InertiaLink
                                    href="/my-profile"
                                    className="mr-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Cancel
                                </InertiaLink>
                                <button
                                    type="submit"
                                    className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                        </AddressForm>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;
