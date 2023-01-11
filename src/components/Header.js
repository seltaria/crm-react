import React from "react";

export function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="#">
          <img src="crm-react/img/icon-origami.png" alt=""></img>
        </a>
        <input
          className="header__search"
          placeholder="Введите запрос"
          type="text"
          value={props.inputData}
          onChange={(e) => props.setInputData(e.target.value)}
        />
      </div>
    </header>
  )
}