import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Loader({width, color}) {
    return (
        <LoaderContainer>
            <ThreeDots width={width} color={color} />
        </LoaderContainer>
    )
};

const LoaderContainer = styled.div`

    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--my-color);
`;