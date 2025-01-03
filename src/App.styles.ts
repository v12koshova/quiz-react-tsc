import styled, { createGlobalStyle } from 'styled-components'

//@ts-ignore
import BGImage from './images/bg.jpg'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Dosis', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }
  .error {
    color: red;
  }
  .select {
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    height: 40px;
    padding: 0 40px;
    margin-bottom: 20px;
    cursor: pointer;
    filter: drop-shadow(2px 2px #0085a3);
    border-radius: 10px;
    width: 100%;
  }

  @media (min-width: 540px) {
    .select {
      width: fit-content;
    }
    .select:first-of-type {
      border-radius: 10px 0px 0px 10px;
    }

    .select:last-of-type {
      border-radius: 0px 10px 10px 0px;
      
    }
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }
  
  .start, .next {
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    cursor: pointer;
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }

  .start:disabled {
    z-index: -1;
    animation: disabled 5s ease 0s;
  }


  @keyframes disabled {
    90% {  
      color:rgb(154, 154, 154);
    }
    100% {
      color: initial;
    }
  }
`;