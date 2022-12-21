import React from "react";

export function DeleteModal(props) {

  /* Стили для изменения видимости модального окна: */
  const styles = props.isOpen ?
    { visibility: "visible", opacity: "1" } :
    { visibility: "hidden", opacity: "0" }

  /* Удаление клиента с сервера */
  async function deleteClient() {
    await fetch(`http://localhost:3000/api/clients/${props.clientId}`, {
      method: 'DELETE'
    })
    fetch('http://localhost:3000/api/clients')
      .then(res => res.json())
      .then(data => props.setClients(data))
    props.toggleDeleteModal();
  }

  return (
    <div className="delete" style={styles}>
      <div className="delete__wrapper">
        <h2 className="delete__title">
          Удалить клиента
        </h2>
        <p className="delete__text">
          Вы действительно хотите удалить данного клиента?
        </p>
        <button className="delete__button-delete" onClick={deleteClient}>
          Удалить
        </button>
        <button onClick={props.toggleDeleteModal} className="delete__button-cancel">
          Отмена
        </button>
      </div>
    </div>
  )
}