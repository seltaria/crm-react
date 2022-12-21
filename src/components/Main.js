import React, { useState, useEffect } from "react";
import { DeleteModal } from "./DeleteModal";
import { Modal } from "./Modal";
import { Table } from "./Table";

export function Main(props) {
  /* Состояние модального окна (открыто/закрыто): */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /* Параметр, отвечающий за отображение модального окна создания/редактирования клиента: */
  /* modalKey === "add" || "edit" */
  const [modalKey, setModalKey] = useState('')

  /* ID выбранного клиента: */
  const [clientId, setClientId] = useState('')

  /* Список клиентов: */
  const [clients, setClients] = React.useState([])

  /* Получение данных с сервера: */
  useEffect(() => {
    fetch('http://localhost:3000/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
    console.log('Данные получены')
  }, [])

  /* Переключение состояния модального окна: */
  function toggleModal(key) {
    setModalKey(key);
    setIsModalOpen(prevState => !prevState);
    props.setInputData('');
  }
  function toggleDeleteModal() {
    setIsDeleteModalOpen(prevState => !prevState);
    props.setInputData('');
  }

  /* Получение id выбранного клиента из таблицы: */
  const client = (id) => {
    setClientId(id)
  }

  return (
    <main className="main container">
      <h2 className="clients__title">
        Клиенты
      </h2>
      <Table
        clients={clients}
        toggleModal={toggleModal}
        toggleDeleteModal={toggleDeleteModal}
        getId={client}
        inputData={props.inputData}
        setInputData={props.setInputData}
      />
      <button className="clients__button-add" onClick={() => toggleModal('add')}>
        <img src="/img/add_client.svg" alt="" />
        Добавить клиента
      </button>
      <Modal
        clients={clients}
        isOpen={isModalOpen}
        toggleDeleteModal={toggleDeleteModal}
        toggleModal={toggleModal}
        modalKey={modalKey}
        clientId={clientId}
        setClients={setClients}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleDeleteModal={toggleDeleteModal}
        clientId={clientId}
        setClients={setClients}
      />
    </main>
  )
}