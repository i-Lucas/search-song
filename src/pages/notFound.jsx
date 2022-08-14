import styled from "styled-components";
import notfound from "../assets/notfound.svg";

export default function NotFound() {

    return (
        <NotFoundContainer>
            <Title>
                <Ops>Ops ! 404</Ops>
                <a href="/">come back home</a>
            </Title>
            <Image>
                <img src={notfound} alt="Not Found" />
            </Image>
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`

    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: var(--my-color);
`;

const Title = styled.div`

    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
        color: white;
        margin-top: 2%;
        font-size: 12px;
        text-decoration: none;
        font-family: var(--my-font);
    }
`;

const Ops = styled.h1`

    font-size: 3rem;
    font-weight: bold;
    font-family: var(--my-font);
    color: white;
`;

const Image = styled.div`

    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 60%;
    }
`;