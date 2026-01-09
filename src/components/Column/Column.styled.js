import styled from "styled-components";

export const SMainColumn = styled.div`
  // стили для .main__column
  width: 20%;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 280px;
    min-width: 280px;
    flex-shrink: 0;
    margin: 0;
  }

  @media screen and (max-width: 495px) {
    width: 250px;
    min-width: 250px;
  }

  @media screen and (max-width: 375px) {
    width: 220px;
    min-width: 220px;
  }
`;

export const SColumnTitle = styled.div`
  // стили для .column__title
  padding: 0 10px;
  margin: 15px 0;

  @media screen and (max-width: 495px) {
    padding: 0 5px;
    margin: 10px 0;
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media screen and (max-width: 495px) {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
