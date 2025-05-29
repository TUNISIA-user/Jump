import React, { useReducer, createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // ✅ Move socket connection outside

const initialState = {
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "add__user":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

// Create context
const GlobalContext = createContext();

// Context provider component
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentuser, setCurrentuser] = useState(null);

    useEffect(() => {
        console.log(state);
    }, [state.user]);

    useEffect(() => {
        const handleSocketId = (buffer) => {
            console.log("Received SOCKET__ID:", buffer);
            setCurrentuser(buffer);
            localStorage.setItem("SOCKET__ID__KEY", buffer);
        };

        socket.on("SOCKET__ID", handleSocketId);

        return () => {
            socket.off("SOCKET__ID", handleSocketId);
        };
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
                user: state.user,
                socket, // ✅ Provide the socket globally
                currentuser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
