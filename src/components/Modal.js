import React, { useState } from "react";

export function Modal(props) {

  const [error, setError] = React.useState(false)

  /* Объект с данными пользователей в виде "id: client": */
  const idDict = Object.fromEntries(props.clients.map(n => [n.id, n]))

  /* Состояние данных инпутов: */
  const [formData, setFormData] = useState(
    {
      name: "",
      surname: "",
      middlename: "",
    }
  )

  /* Заполнение инпутов данными пользователя при редактировании: */
  React.useEffect(() => {
    setFormData({
      name: props.modalKey === "edit" ? idDict[props.clientId].name : "",
      surname: props.modalKey === "edit" ? idDict[props.clientId].surname : "",
      middlename: props.modalKey === "edit" ? idDict[props.clientId].lastName : "",
    })
  }, [props.isOpen])

  /* Функция отслеживания изменений в инпутах: */
  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value.trim()
      }
    })
  }

  /* Стили для изменения видимости модального окна: */
  const styles = props.isOpen ?
    { visibility: "visible", opacity: "1" } :
    { visibility: "hidden", opacity: "0" }

  /* Закрытие модального окна, очищение полей инпутов: */
  function closeModal() {
    props.toggleModal();
    setError(false);
    setFormData({
      name: "",
      surname: "",
      middlename: "",
    })
  }

  /* Функция добавления нового клиента по данным инпутов: */
  async function addClient() {
    if (formData.name && formData.surname) {
      const a = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.charAt(0).toUpperCase() + formData.name.slice(1),
          surname: formData.surname.charAt(0).toUpperCase() + formData.surname.slice(1),
          lastName: formData.middlename.charAt(0).toUpperCase() + formData.middlename.slice(1),
        })
      })
      const data = await a.json()
      props.setClients(prevState => [...prevState, data])

      setError(false);
      closeModal();
    } else {
      setError(true);
    }
  }

  /* Функция изменения данных клиента на сервере: */
  async function editClient() {
    if (formData.name && formData.surname) {
      const a = await fetch(`http://localhost:3000/api/clients/${props.clientId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: formData.name.charAt(0).toUpperCase() + formData.name.slice(1),
          surname: formData.surname.charAt(0).toUpperCase() + formData.surname.slice(1),
          lastName: formData.middlename.charAt(0).toUpperCase() + formData.middlename.slice(1),
        })
      })
      const data = await a.json();
      /* Применение изменений в таблице после редактирования клиента: */
      props.setClients(props.clients.map(client => client.id === props.clientId ? data : client))

      setError(false);
      closeModal();
    } else {
      setError(true);
    }
  }

  /* Функция удаления клиента (из окна редактирования): */
  function deleteClient() {
    props.toggleDeleteModal('delete');
    setError(false);
    closeModal();
  }

  return (
    <div className="add" style={styles}>
      <div className="add__wrapper">
        <div className="add__form-wrap">
          <div className="add__title-wrapper">
            <h2 className="add__title">
              {props.modalKey === "add" ? "Новый клиент" : "Изменить данные"}
            </h2>
            {props.modalKey === "edit" && <div className="edit__id">ID: {props.clientId}</div>}
            <button className="add__close" onClick={props.toggleModal}>
              <img src="/img/close-modal.svg" alt="close" />
            </button>
          </div>
          <form className="add__form">
            <div className="add__input-container">
              <input
                className="add__input"
                id="surname-add"
                placeholder="Фамилия*"
                type="text"
                name="surname"
                onChange={handleChange}
                value={formData.surname}
                style={!formData.surname && error ? { borderColor: "rgba(240, 106, 77, 1)" } : { borderColor: "rgba(51, 51, 51, 0.2)" }}
              />
            </div>
            <div className="add__input-container">
              <input
                className="add__input"
                id="name-add"
                placeholder="Имя*"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                style={!formData.name && error ? { borderColor: "rgba(240, 106, 77, 1)" } : { borderColor: "rgba(51, 51, 51, 0.2)" }}
              />
            </div>
            <div className="add__input-container">
              <input
                className="add__input"
                id="middlename-add"
                placeholder="Отчество"
                type="text"
                name="middlename"
                onChange={handleChange}
                value={formData.middlename}
              />
            </div>
          </form>
        </div>
        {error && (!formData.name || !formData.surname) && <div className="add__error">Поля обязательны для заполнения</div>}
        <button className="add__button-save" onClick={props.modalKey === "add" ? addClient : editClient}>
          Сохранить
        </button>
        {props.modalKey === "add" && <button className="add__button-cancel" onClick={closeModal}>Отмена</button>}
        {props.modalKey === "edit" && <button className="add__button-cancel" onClick={deleteClient}>Удалить клиента</button>}
      </div>
    </div>
  )
}