import styled from "styled-components";

export const SPopExit = styled.div `
// стили для .pop-exit
    display: none;
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
`;
export const SPopExitContainer = styled.div `
// стили для .pop-exit__container
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
`;

export const SPopExitBlock = styled.div `
// стили для .pop-exit__block
    display: block;
    margin: 0 auto;
    background-color: #FFFFFF;
    max-width: 370px;
    width: 100%;
    padding: 50px 60px;
    border-radius: 10px;
    border: 0.7px solid #D4DBE5;
    box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const SPopExitFormGroup = styled.div `
// стили для .pop-exit__form-group
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`