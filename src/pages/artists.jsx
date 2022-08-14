import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import Header from "../components/header";
import Loader from "../components/loader";
import nobands from "../assets/nobands.svg";

export default function RankArtists() {

    const [loading, setLoading] = React.useState(false);
    const [rank, setRank] = React.useState([]);

    React.useEffect(() => {

        setLoading(true);
        axios.get(config.HEROKU_API + "/rank/bands").then(res => {

            setRank(res.data);
            setLoading(false);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });

    }, []);

    return (
        <RankArtistsContainer>
            <Header />
            <RankArtistsContent>
                {loading ? <Loader /> :

                    rank.map(band => (
                        <ArtistBox key={band.id}>
                            <Name>{band.name}</Name>
                            <Views>Researches: {band.visits}</Views>
                        </ArtistBox>
                    ))}


                {rank.length === 0 &&
                    <NoSongs>
                        <img src={nobands} alt="search" />
                        <h1>do an advanced search</h1>
                    </NoSongs>
                }
            </RankArtistsContent>
        </RankArtistsContainer>
    )
};

const RankArtistsContainer = styled.div`

    width: 100%;
    height: 100vh;
`;

const RankArtistsContent = styled.div`

    width: 100%;
    height: 80%;
    overflow-y: scroll;
    flex-wrap: wrap;
`;

const ArtistBox = styled.div`

    width: 50%;
    height: 20%;
    margin: 2% auto;
    border-radius: 10px;
    cursor: pointer;
    background-color: lightgray;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 768px) {
        width: 90%;
        height: 20%;
    }
`;

const Name = styled.h1`

    font-size: 1.5rem;
    font-weight: bold;
    color: var(--my-color);
    font-family: var(--my-font);
    margin-top: 3%;
    margin-left: 5%;
`;

const Views = styled.h1`

    font-size: 1rem;
    font-weight: bold;
    color: var(--my-color);
    font-family: var(--my-font);
    margin-top: 2%;
    margin-left: 5%;
`;

const NoSongs = styled.div`

    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;       
    text-align: center; 

    img {
        width: 30%;
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
            width: 70%;
        }
    }
`;