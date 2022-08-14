import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import Header from "../components/header";
import Session from "../services/session";
import Loader from "../components/loader";
import RenderSongs from "../components/songs";

export default function SavedSongs() {

    const userId = Session();
    const [saved, setSaved] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {

        setLoading(true);
        axios.get(`${config.HEROKU_API}/mysongs?user=${userId}`).then(res => {

            setLoading(false);
            setSaved(res.data);
        }).catch(err => console.log(err));

    } , [userId]);
    
    return (
        <SavedSongsContainer>
            <Header />
            {
                loading ? <Loader width={250} color={"white"} /> : <RenderSongs songs={saved} uid={userId} />
            }
        </SavedSongsContainer>
    )
};

const SavedSongsContainer = styled.div`

    width: 100%;
    height: 100vh;
`;