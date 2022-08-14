import React from "react";
import axios from "axios";
import config from "../config.json"
import styled from "styled-components"
import Header from "../components/header";
import search from "../assets/search.svg";
import Session from "../services/session";
import RenderSongs from "../components/songs";
import { ThreeDots } from "react-loader-spinner"

export default function Home() {

    const userId = Session();
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    function onSearch(value) {

        setLoading(true);

        // remove special characters from the search
        const cleanValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        axios.post(`${config.HEROKU_API}/search`, { music: cleanValue, userId })
            .then(res => {
                setResults(res.data);
                setLoading(false);
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

                        {results.length > 0 ? <RenderSongs songs={results} /> :
                            <NoSongs>
                                <img src={search} alt="search" />
                                <h1>search for a song</h1>
                            </NoSongs>
                        }
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

const NoSongs = styled.div`

    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;        

    img {
        width: 20%;
    }

    h1 {

        font-size: 2rem;
        font-weight: bold;
        font-family: var(--my-font);
        color: white;
        margin-top: 2rem;
    }

    @media (max-width: 768px) {
        height: 50vh;

        img {
            width: 50%;
        }
    }
`;