import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function RenderSongs({ songs, uid }) {

    const navigate = useNavigate();

    const increment = window.location.pathname === "/rank/songs" || window.location.pathname === "/saved/songs";

    function goTo(id) {
        return navigate(`/lyrics/${id}`, { state: { increment_views: increment ? false : true } });
    };

    return (
        <SearchResults>
            {songs.map(song => (
                <SearchBox key={song.id} onClick={() => goTo(song.id)}>
                    <TitleBox>
                        <TitleMusic >
                            <Title bold >Music: {song.title} </Title>
                        </TitleMusic>
                        <ViewsBox>
                            {song.visits && <ShowVisits>views: {song.visits}</ShowVisits>}
                        </ViewsBox>
                    </TitleBox>
                    <BandBox>
                        <TitleBand>
                            <Title>Band : {song.band}</Title>
                        </TitleBand>
                    </BandBox>
                </SearchBox>
            ))}
        </SearchResults>
    )
};

const SearchResults = styled.div`

    width: 100%;
    height: 80%;
    overflow-y: scroll;
    flex-wrap: wrap;
`;

const SearchBox = styled.div`

    width: 50%;
    height: 30%;
    margin: 2% auto;
    border-radius: 10px;
    cursor: pointer;
    background-color: lightgray;

    @media (max-width: 768px) {
        width: 90%;
        height: 20%;
    }
`;

const TitleBox = styled.div`

    width: 100%;
    height: 50%;
    display: flex;
    padding-left: 10px;
    align-items: center;
    justify-content: flex-start;
`;

const BandBox = styled.div`

    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    justify-content: flex-start;
`;

const ViewsBox = styled.div`

    width: 30%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    ion-icon {
        font-size: 2rem;
    }
`;

const TitleBand = styled.div`

    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const TitleMusic = styled.div`

    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.h1`

    font-size: 1rem;
    font-weight: ${props => props.bold ? "bold" : "normal"};
    font-family: var(--my-font);
`;

const ShowVisits = styled.h1`

    font-size: 0.8rem;
    font-weight: bold;
    color: var(--my-color);
    font-family: var(--my-font);

    margin-left: 10%;
    margin-right: 10%;
`;