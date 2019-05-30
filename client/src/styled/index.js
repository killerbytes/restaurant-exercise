import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

*,
*::before,
*::after {
  box-sizing: border-box;
}

  html,
  body {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
    font-size: 14px;
    margin: 0;
    color: ${props => props.theme.default};
  }
  button,a{
    cursor: pointer;
    outline: none;
  }
  .container{
    padding: 2rem;
  }
  h1,h2,h3,h4, p{
    margin-top: 0;
    margin-bottom: .5rem;
  }
  .leaflet-container {
    height: 50vh;
    width: 100%;
    margin: 0 auto;
  }
 
`;
