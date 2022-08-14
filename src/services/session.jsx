import React from "react";
import Storage from "./storage";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

export default function Session() {

    const navigate = useNavigate();

    React.useEffect(() => {

        if (!Storage.GetStore("token")) {
            return navigate("/");
        };

        if (isExpired(Storage.GetStore("token"))) {
            alert("Session expired, please login again");
            Storage.RemoveStore("token");
            return navigate("/");
        };

    }, [navigate]);

    const DecodedToken = decodeToken(Storage.GetStore("token"));

    if (DecodedToken) { return DecodedToken.id; }
    else return null;
};