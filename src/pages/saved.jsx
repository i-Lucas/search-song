import React from "react";
import axios from "axios";
import config from "../config.json";
import styled from "styled-components";
import Header from "../components/header";
import Session from "../services/session";
import Loader from "../components/loader";
import RenderSongs from "../components/songs";
import empty from "../assets/empty.svg";

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

    }, [userId]);

    return (
        <SavedSongsContainer>
            <Header />
            {loading ? <Loader width={250} color={"white"} /> :
                saved.length > 0 ? <RenderSongs songs={saved} /> :
                    <NoSongs><img src={empty} alt="empty" /><h1>No songs saved</h1></NoSongs>}
        </SavedSongsContainer>
    )
};

const SavedSongsContainer = styled.div`

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