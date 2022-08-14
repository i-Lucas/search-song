import React from "react";
import styled from "styled-components";
import welcome from "../assets/welcome.svg";
import { ThreeDots } from "react-loader-spinner";

export default function Welcome({ start }) {

    const loading_phrases = [
        "preparing the app ...",
        "taking off the dirt ...",
        "chasing bugs ...",
        "getting your location ...",
        "hacking your password ..."
    ];

    const [welcomeText, setWelcomeText] = React.useState("");

    if (!start) {
        let timer = setTimeout(() => {
            setWelcomeText(loading_phrases[Math.floor(Math.random() * loading_phrases.length)]);
        }, 1500);
        if (start) {
            clearTimeout(timer);
        }
    };

    return (
        <WelcomeContainer>
            <img src={welcome} alt="welcome" />
            <ThreeDots width={150} color="white" />
            <p>{welcomeText}</p>
        </WelcomeContainer>
    );
};

const WelcomeContainer = styled.div`

    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    img {
        width: 50%;
    }

    p {
        font-size: 1.5rem;
        font-family: var(--my-font);
        color: white;
    }
`;