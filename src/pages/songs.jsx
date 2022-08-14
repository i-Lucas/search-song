import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import empty from "../assets/empty.svg";
import Header from "../components/header";
import Loader from "../components/loader";
import Session from "../services/session";
import RenderSongs from "../components/songs";

export default function RankSongs() {

    const userId = Session();
    const [songs, setSongs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {

        if (userId === null) return;

        axios.get(`${config.HEROKU_API}/rank/songs?user=${userId}`).then(res => {
            setSongs(res.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.log(err.response.data);
            alert('an unexpected error occurred while fetching the rank');
        });

    }, [userId]);

    return (
        <RankSongsContainer>
            <Header />
            {loading ? <Loader width={250} color={"white"} /> :
                songs.length > 0 ? <RenderSongs songs={songs} /> :
                    <NoSongs><img src={empty} alt="empty" /><h1>No music searched</h1></NoSongs>}
        </RankSongsContainer>
    )
};

const RankSongsContainer = styled.div`

    width: 100%;
    height: 100vh;
`;

const NoSongs = styled.div`

    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;        

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
    }
`;