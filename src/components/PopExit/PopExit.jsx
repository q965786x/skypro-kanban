import React from "react";
import { SPopExit, SPopExitContainer, SPopExitBlock, SPopExitFormGroup } from './PopExit.styled';

const PopExit = () => {
    return (
        <SPopExit>
				<SPopExitContainer>
					<SPopExitBlock>
						<div className="pop-exit__ttl">
							<h2>Выйти из аккаунта?</h2>
						</div>
						<form className="pop-exit__form" id="formExit" action="#">
							<SPopExitFormGroup>
								<button className="pop-exit__exit-yes _hover01" id="exitYes"><a href="modal/signin.html">Да, выйти</a> </button>
								<button className="pop-exit__exit-no _hover03" id="exitNo"><a href="main.html">Нет, остаться</a> </button>
							</SPopExitFormGroup>
						</form>
					</SPopExitBlock>
				</SPopExitContainer>
		</SPopExit>
    );
};

export default PopExit;