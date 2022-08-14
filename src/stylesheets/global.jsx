import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        
        box-sizing: border-box;
        --my-color: #42446E;
        --my-font: 'Poppins', sans-serif;
    }

    body {
      background-color: var(--my-color);
    }
    
    /* Works on Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: gray transparent;
    }
    
    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 0px;
      height: 5px;
    }
    
    *::-webkit-scrollbar-track {
      background: transparent;
    }
    
    *::-webkit-scrollbar-thumb {
      background-color: lightgray;
      border-radius: 10px;
      border: 1px solid gray;
    }
`;

export default GlobalStyle;