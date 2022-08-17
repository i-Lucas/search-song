import axios from 'axios';
import React from "react";
import config from "../config.json"
import styled from 'styled-components';
import Storage from "../services/storage";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Welcome from './welcome';

export default function Login() {

    Storage.RemoveStore("token");
    const navigate = useNavigate();

    const [data, setData] = React.useState({ name: "", email: "", password: "", confirm: "" });
    const [state, setState] = React.useState({ signup: false, loading: false });
    const [start, setStart] = React.useState(false);

    const [visits, setVisits] = React.useState(0);

    const hasVisited = Storage.GetStore("8af");
    console.log(hasVisited);

    React.useEffect(() => {

        axios.post(config.HEROKU_API + `/start-app?increment=${!hasVisited}`).then(res => {
            setStart(true);
            setVisits(res.data.visits);
            Storage.SetStore("8af", true)
        }).catch(err => console.log(err));

    }, [state, hasVisited]);

    const LinkContent = state.signup ? "Already have an account ? Sign-In!" : "Don't have an account ? Sign-Up!";
    const ButtonContent = state.loading ? <ThreeDots width={50} /> : state.signup ? "Sign Up" : "Sign In";
    const TitleContent = state.signup ? "Sign Up" : "Sign In";

    function handleSubmit(e) {

        e.preventDefault();
        setState({ ...state, loading: true });

        const signupData = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        if (state.signup) {

            if (data.password !== data.confirm) {
                setState({ ...state, loading: false })
                return alert("Passwords do not match")
            };

            axios.post(`${config.HEROKU_API}/signup`, signupData).then(res => {
                setState({ loading: false, signup: false });
                alert(res.data);
            }).catch(err => {
                setState({ loading: false, signup: true });
                alert(err.response.data);
            })

        } else {

            delete signupData.name;
            axios.post(`${config.HEROKU_API}/signin`, signupData).then(res => {
                Storage.SetStore("token", res.data);
                setState({ loading: false, signup: false });
                navigate("/search");
            }).catch(err => {
                setState({ loading: false, signup: false });
                alert(err.response.data)
            });
        }
    };

    return !start ?

        <Welcome start={start} /> :

        (
            <PageContainer>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <Title>{TitleContent}</Title>

                        {state.signup &&
                            <Input type="text" placeholder="Name" value={data.name} required
                                onChange={e => setData({ ...data, name: e.target.value })} />}

                        <Input type="email" placeholder="Email"
                            onChange={(e) => setData({ ...data, email: e.target.value })} required />

                        <Input type="password" placeholder="Password"
                            onChange={(e) => setData({ ...data, password: e.target.value })} required />

                        {state.signup &&
                            <Input type="password" placeholder="Confirm Password" required
                                onChange={(e) => { setData({ ...data, confirm: e.target.value }) }} />}

                        <ButtonSubmit type="submit">{ButtonContent}</ButtonSubmit>
                        <Link onClick={() => setState({ ...state, signup: !state.signup })}>{LinkContent}</Link>

                        <NumberOfVisits>
                            <Visits>Number of visits: {visits}</Visits>
                        </NumberOfVisits>
                    </Form>
                </FormContainer>
                <PanelContainer >
                    <Title size={"5rem"}>Search Songs</Title>
                </PanelContainer>
            </PageContainer>
        )
};

const PageContainer = styled.div`

    width: 100%;
    height: 100vh;
    display: flex;
    background-color: var(--my-color)
`;

const FormContainer = styled.div`

    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Form = styled.form`

    width: 80%;
    height: 80%;

    display: flex;
    border-radius: 10px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #666666;
    font-family: var(--my-font);
    box-shadow: 0px 0px 10px black;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`;

const Input = styled.input`

    width: 80%;
    height: 10%;
    padding: 10px;
    font-size: 1rem;
    margin-top: 5%;
    font-weight: bold;
    border-radius: 10px;
    font-family: var(--my-font);
`;

const ButtonSubmit = styled.button`

    width: 80%;
    height: 6%;
    display: flex;
    margin-top: 3%;
    cursor: pointer;
    font-weight: bold;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    font-family: var(--my-font);
`;

const Link = styled.a`

    color: white;
    font-size: 15px;
    cursor: pointer;
    margin-top: 25px;
    font-weight: bold;
`;

const Title = styled.h1`

    color: white;
    font-family: var(--my-font);
    font-size: ${props => props.size ? props.size : "2rem"};
`;

const PanelContainer = styled.div`

    width: 60%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    border: 1px solid #666666;
    box-shadow: 0px 0px 10px black;

    @media (max-width: 768px) {
        display: none;
    }
`;

const NumberOfVisits = styled.div`

    position: fixed;
    bottom: 5%;

    @media (min-width: 768px) {
        top: 5%;
        right: 5%;
    }
`;

const Visits = styled.h1`

    font-size: 0.8rem;
    font-family: var(--my-font);
    font-weight: bold;
    color: #FFFFFF;
`;