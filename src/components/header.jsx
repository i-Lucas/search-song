import React from "react";
import styled from "styled-components";
import IsDesktop from "../services/device";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const mobile = !IsDesktop();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    function ShowBoxOptions() {
        return (
            <React.Fragment>
                <BoxOption mobile={mobile}>
                    <ion-icon name="search-outline" />
                    <Title onClick={() => navigate("/search/advanced")}>Advanced Search</Title>
                </BoxOption>
                <BoxOption mobile={mobile}>
                    <ion-icon name="save-outline" />
                    <Title onClick={() => navigate("/saved/songs")}>My Saved Songs</Title>
                </BoxOption>
                <BoxOption mobile={mobile}>
                    <ion-icon name="trending-up-outline" />
                    <Title onClick={() => navigate("/rank/artists")}>Most Searched Artists</Title>
                </BoxOption>
                <BoxOption mobile={mobile}>
                    <ion-icon name="thermometer-outline" />
                    <Title onClick={() => navigate("/rank/songs")}>Most Searched Songs</Title>
                </BoxOption>
                <BoxOption mobile={mobile}>
                    <ion-icon name="home-outline"></ion-icon>
                    <Title onClick={() => navigate("/search")}>Home</Title>
                </BoxOption>
                {mobile && <BoxOption mobile={mobile}>
                    <ion-icon name="caret-up-outline" />
                    <Title>Hide</Title>
                </BoxOption>}
            </React.Fragment>
        )
    };

    return mobile ?

        <MobileComponent open={open} onClick={() => setOpen(!open)}>
            {!open && <ion-icon name="caret-down-outline" />}
            {open && <ShowOptions> <ShowBoxOptions /> </ShowOptions>}
        </MobileComponent>

        :

        <DesktopComponent >
            <ShowBoxOptions />
        </DesktopComponent>;
};

const DesktopComponent = styled.div`

    width: 100%;
    height: 10%;
    
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #575760;;
    box-shadow: 0px 0px 10px black;
`;

const MobileComponent = styled.div`

    width: 100%;
    height: ${props => props.open ? "50%" : "10%"};
    
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: height 1s;
    background-color: #575760;
    box-shadow: 0px 0px 10px black;

    ion-icon {
        font-size: 2rem;
        color: white;
    }
`;

const ShowOptions = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const BoxOption = styled.div`

    width: ${props => props.mobile ? "75%" : "calc(100% / 5)"};
    height: ${props => props.mobile ? "calc(100% / 6)" : "100%"};
    justify-content: ${props => props.mobile ? "space-between" : "center"}; 

    display: flex;
    align-items: center;
    
    ion-icon {
        font-size: 1.5rem;
        color: white;
        margin-right: ${props => props.mobile ? "0%" : "5%"};
    }
`;

const Title = styled.h1`

    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    font-family: var(--my-font);

    &:hover {
        color: black;
    }
`;