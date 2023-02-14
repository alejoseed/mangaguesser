import React from "react";
import { useRouteError } from "react-router-dom";
import NavBar from "./components/navBar";
import raw from "./raw.png";

interface Error {
  statusText?: string;
  status?: number;
  code?: number;
}

export default function ErrorPage() {
    const error = useRouteError() as Error;    
    console.log(error)
    
    return (
        <div>
            <NavBar />
            <div className="flex flex-col h-screen">
                <div className="flex items-center  pt-10 justify-center">
                    <img src={raw} alt="raw" className="w-1/2 rounded-xl shadow" />
                </div>
                <div className="flex flex-col items-center justify-center m-3">
                    <h1>Oh Oh! - Seems like you're lost. Try going back to the home page.</h1>
                    <p>Error {error.status} {error.statusText}</p>
                </div>
            </div>
        </div>
    );
}