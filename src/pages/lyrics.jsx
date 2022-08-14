import React from "react";
import axios from "axios";
import config from "../config.json"
import styled from "styled-components";
import Header from "../components/header";
import Loader from "../components/loader";
import Session from "../services/session";
import { ThreeDots } from "react-loader-spinner";
import { useParams, useLocation } from "react-router-dom"

export default function Lyrics() {

    const userId = Session();
    const { musicId } = useParams();
    const [lyric, setLyric] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [update, setUpdate] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    const location = useLocation();
    const increment = location.state.increment_views;
    const icon_save = lyric.saved ? "trash-outline" : "save-outline";

    React.useEffect(() => {

        if (userId === null) return;
        axios.get(`${config.HEROKU_API}/lyrics/${musicId}?increment=${increment}&user=${userId}`)
        .then(res => {
            setLyric(res.data);
            setLoading(false);
        }).catch(err => console.log(err));

    }, [userId, musicId, increment, update]);

    function saveThis(id) {

        setSaving(true);
        axios.post(`${config.HEROKU_API}/save/${id}`, { userId })
        .then(res => {
            setTimeout(() => {
                setUpdate(!update);
                setSaving(false);
            }, 1200);
        }).catch(err => console.log(err.response.data));
    };

    return (
        <LyricsComponent>
            <Header />

            {loading ? <Loader width={250} color={"white"} /> :

                <MusicContainer>
                    <MusicDataBox>
                        <MusicData>
                            <Content>
                                <BoxTitle>
                                    <Title bold size={"2rem"} >{lyric.title}</Title>
                                    <Title margin size={"1.2rem"} >{lyric.band}</Title>
                                </BoxTitle>
                                <BoxPicture>
                                    <img src={lyric.picture} alt="band_picture" />
                                </BoxPicture>
                            </Content>
                        </MusicData>
                    </MusicDataBox>
                    <Body>
                        <LyricsBox>
                            <LyricsContent>
                                <ContentLyrics>
                                    <Title spaced size={"1rem"}>{lyric.text.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Title>
                                </ContentLyrics>
                            </LyricsContent>
                        </LyricsBox>
                    </Body>
                </MusicContainer>
            }

            <SaveOrDelete>
                {!loading ?
                    saving ? <ThreeDots width={50} color={"white"} /> :
                    <ion-icon name={icon_save} onClick={() => saveThis(lyric.id)} /> : null
                }
                {!loading && <Title size={"8px"} >{saving ? "" : lyric.saved ? "saved" : "save"}</Title>}
            </SaveOrDelete>
        </LyricsComponent>
    )
};

const LyricsComponent = styled.div`

    width: 100%;
    height: 100vh;
    background-color: var(--my-color);
`;

const SaveOrDelete = styled.div`

    width: 10%;
    height: 10%;
    bottom: 2%;
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    ion-icon {

        font-size: 1.5rem;
        color: white;

        &:hover {
            cursor: pointer;
        }
    }

    h1 {

        margin-right: 4px;
    }

    @media (max-width: 768px) {

        ion-icon {
            font-size: 1.2rem;
        }
        h1 {
            font-size: 12px;
            margin-right: 2px;
        }4
    }
`;

const MusicContainer = styled.div`

    width: 100%;
    height: 90%;
`;

const MusicDataBox = styled.div`

    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
`;

const MusicData = styled.div`

    width: 89%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    box-shadow: 0px 0px 10px black;
`;

const BoxTitle = styled.div`

    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media (min-width: 768px) {
        width: 80%;
    }
`;

const Title = styled.h1`

    font-size: ${props => props.size};
    font-weight: ${props => props.bold ? "bold" : "normal"};
    line-height: ${props => props.spaced ? "1.8rem" : "1.2rem"};
    font-family: var(--my-font);
    margin-left: 5%;
    margin-top: ${props => props.margin ? "5%" : "0"};
    color: white;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-top: ${props => props.margin ? "20%" : "0"};
    }
`;

const BoxPicture = styled.div`

    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 40%;
        height: 90%;
        border-radius: 50%;
    }

    @media (max-width: 768px) {
        img {
            width: 50%;
            height: 50%;
        }
    }
`;

const Body = styled.div`

    width: 100%;
    height: 70%;
`;

const LyricsBox = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LyricsContent = styled.div`

    width: 80%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 10px black;
`;

const ContentLyrics = styled.div`

    width: 80%;
    height: 100%;
    padding: 5%;
    display: flex;
    overflow-y: scroll;
    justify-content: center;
`;