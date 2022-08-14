import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import Header from "../components/header";
import { ThreeDots } from "react-loader-spinner";
import RenderSongs from "../components/songs";

export default function AdvancedSearch() {

    const [loading, setLoading] = React.useState(false);
    const [hasResults, setHasResults] = React.useState(false);
    const [data, setData] = React.useState({ artist: "", music: "" });
    const [song, setSong] = React.useState([{ id: "", title: "", band: "", }]);
    const buttonContent = loading ? <ThreeDots width={60} color={"var(--my-color)"} /> : "Search";

    function onSearch() {

        setLoading(true);

        axios.post(config.HEROKU_API + "/advanced", { artist: data.artist, music: data.music, })
            .then(res => {

                setLoading(false);

                if (res.data.type === "song_notfound") return alert("Song not found");
                if (res.data.type === "notfound") return alert("Any result found");

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
                    {hasResults && <RenderSongs songs={song} />}
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