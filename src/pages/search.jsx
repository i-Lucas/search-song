import React from "react";
import axios from "axios";
import config from "../config.json"
import styled from "styled-components"
import Header from "../components/header";
import { ThreeDots } from "react-loader-spinner"
import Session from "../services/session";
import RenderSongs from "../components/songs";

export default function Home() {

    const userId = Session();
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    function onSearch(value) {
        setLoading(true);
        axios.post(`${config.HEROKU_API}/search`, { music: value, userId })
            .then(res => {
                setLoading(false);
                setResults(res.data);
            }).catch(err => console.log(err))
    };

    return (

        <HomeComponent>
            <Header />
            <Body>

                {loading ?

                    <LoaderContainer>
                        <ThreeDots width={250} color="white" />
                    </LoaderContainer>

                    :

                    <React.Fragment>
                        <SearchBar>
                            <SearchInput type="text" placeholder="Search for a song"
                                onKeyDown={(e) => { if (e.key === "Enter") { onSearch(e.target.value); e.target.value = "" } }} />
                        </SearchBar>

                        <RenderSongs songs={results} uid={userId}/>
                    </React.Fragment>
                }
            </Body>
        </HomeComponent>
    )
};

const HomeComponent = styled.div`

    width: 100%;
    height: 100vh;
    background-color: var(--my-color);
`;

const Body = styled.div`

    width: 100%;
    height: 90%;
`;

const SearchBar = styled.div`

    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchInput = styled.input`

    width: 80%;
    height: 50%;
    padding: 10px;
    border-radius: 10px;
    font-family: var(--my-font);
    background-color: lightgray;

    @media (min-width: 768px) {
        width: 50%;
    }
`;

const LoaderContainer = styled.div`

    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--my-color);
`;