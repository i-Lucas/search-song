import styled from "styled-components";
import Header from "../components/header";

export default function RankArtists() {
    
    return (
        <RankArtistsContainer>
            <Header />
        </RankArtistsContainer>
    )
};

const RankArtistsContainer = styled.div`

    width: 100%;
    height: 100vh;
`;