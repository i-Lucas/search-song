import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
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
            {loading ? <Loader width={250} color={"white"} /> : <RenderSongs songs={songs} uid={userId} />}
        </RankSongsContainer>
    )
};

const RankSongsContainer = styled.div`

    width: 100%;
    height: 100vh;
`;