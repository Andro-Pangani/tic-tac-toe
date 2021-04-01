import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 20px;
  font-family: monospace;
  margin-bottom: 20px;
  .title {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2em;
  }
  div {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }

  label {
    padding: 5px;
    font-size: 0.8em;
    font-family: 'Courier New', Courier, monospace;
    color: #deb3e8;
  }
  input {
    background: #1d1d1d;
    color: pink;
    font-size: 1.5em;
    border: 1px solid #2d292c;
    border-radius: 3px;
  }

  .play_again {
    color: #24b7e6;
    margin: 0;
  }

  button {
    margin-top: 10px;
    background: #ffffff00;
    padding: 3px 8px;
    border-radius: 8px;
    box-shadow: 0 0 14px 1px #493e5a;
    border: 2px solid transparent;
    color: #0c80d2;
  }

  /* input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } */
`;
