import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import Header from "../components/header";
import alien from "../assets/alien.svg";
import empty_ from "../assets/empty_.svg";
import RenderSongs from "../components/songs";
import { ThreeDots } from "react-loader-spinner";

export default function AdvancedSearch() {

    const [loading, setLoading] = React.useState(false);
    const [hasResults, setHasResults] = React.useState(false);
    const [data, setData] = React.useState({ artist: "", music: "" });
    const [song, setSong] = React.useState([{ id: "", title: "", band: "", }]);
    const [status, setStatus] = React.useState({ anyResults: false, notFound: false });
    const buttonContent = loading ? <ThreeDots width={60} color={"var(--my-color)"} /> : "Search";

    function onSearch() {

        setLoading(true);

        axios.post(config.HEROKU_API + "/advanced", { artist: data.artist, music: data.music, })
            .then(res => {

                setLoading(false);

                if (res.data.type === "song_notfound") {
                    setHasResults(false);
                    setStatus({ anyResults: false, notFound: true });
                };

                if (res.data.type === "notfound") {
                    setHasResults(false);
                    setStatus({ anyResults: true, notFound: false });
                };

                if (res.data.type === "exact") {

                    setSong([{
                        id: res.data.mus[0].id,
                        title: res.data.mus[0].name,
                        band: res.data.art.name,
                    }]);

                    upadateRank(res.data.art.name);
                    setHasResults(true);
                };

            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
    };

    function upadateRank(band) {
        axios.post(config.HEROKU_API + "/rank/bands", { band });
    };

    return (
        <AdvancedSearchContainer>
            <Header />
            <AdvanceContainer>
                <SearchBar>
                    <Form onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
                        <SearchInput type="text" placeholder="Artist or band" required
                            onChange={(e) => setData({ ...data, artist: e.target.value })} />
                        <SearchInput type="text" placeholder="Song or excerpt" required
                            onChange={(e) => setData({ ...data, music: e.target.value })} />
                        <SearchButton type="submit">{buttonContent}</SearchButton>
                    </Form>
                </SearchBar>
                <SearchResults>
                    {hasResults ?
                        <RenderSongs songs={song} /> :
                        status.notFound ?
                            <NoSongs><img src={empty_} alt="empty" /><h1>Song not found !</h1></NoSongs> :
                            status.anyResults ?
                                <NoSongs><img src={alien} alt="empty" /><h1>Any result found :/</h1></NoSongs> :
                                null}
                </SearchResults>
            </AdvanceContainer>
        </AdvancedSearchContainer>
    )
};

const AdvancedSearchContainer = styled.div`

    width: 100%;
    height: 100vh;
`;

const AdvanceContainer = styled.div`

    width: 100%;
    height: 90%;
`;

const SearchBar = styled.div`

    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        height: 30%;
    }
`;

const Form = styled.form`

    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`;

const SearchInput = styled.input`

    width: 80%;
    height: 40%;
    padding: 10px;
    margin-left: 10px;
    border-radius: 10px;
    font-family: var(--my-font);
    background-color: lightgray;

    @media (min-width: 768px) {
        width: 50%;
    }
    @media (max-width: 768px) {
        height: 25%;
    }
`;

const SearchButton = styled.button`

    width: 8%;
    height: 35%;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 10px;
    color: var(--my-color);
    font-family: var(--my-font);

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        margin-top: 1%;
        width: 50%;
        height: 20%;
    }
`;

const SearchResults = styled.div`

    width: 100%;
    height: 80%;

    @media (max-width: 768px) {
        height: 70%;
    }
`;

const NoSongs = styled.div`

    width: 100%;
    height: 60vh;
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
    }
`;