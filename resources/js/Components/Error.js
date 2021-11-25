import React from "react";

const Error = ({children}) => children ? <p className="font-thin text-red-500 text-xs my-1">{children}</p> : '';

export default Error;
