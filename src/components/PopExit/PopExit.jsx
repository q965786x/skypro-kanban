import React from "react";
import {
  SPopExit,
  SPopExitContainer,
  SPopExitBlock,
  SPopExitFormGroup,
} from "./PopExit.styled";

const PopExit = ({ onConfirm, onCancel, isOpen = false }) => {
  const handleExitYes = (e) => {
    e.preventDefault();
    onConfirm?.();
  };

  const handleExitNo = (e) => {
    e.preventDefault();
    onCancel?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <SPopExit style={{ display: "block" }}>
      <SPopExitContainer>
        <SPopExitBlock>
          <div className="pop-exit__ttl">
            <h2
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "700",
                lineHeight: "30px",
                letterSpacing: "-0.4px",
                marginBottom: "20px",
              }}
            >
              Выйти из аккаунта?
            </h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <SPopExitFormGroup>
              <button
                className="pop-exit__exit-yes _hover01"
                id="exitYes"
                onClick={handleExitYes}
                style={{
                  transition: "background-color 0.3s ease",
                }}
              >
                <span>Да, выйти</span>
              </button>
              <button
                className="pop-exit__exit-no _hover03"
                id="exitNo"
                onClick={handleExitNo}
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                <span>Нет, остаться</span>
              </button>
            </SPopExitFormGroup>
          </form>
        </SPopExitBlock>
      </SPopExitContainer>
    </SPopExit>
  );
};

export default PopExit;
