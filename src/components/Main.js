import React, { useState, useEffect } from "react";
import { DeleteModal } from "./DeleteModal";
import { Loading } from "./Loading";
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

  /* Использование локального хранилища: */
  const [isLocal, setIsLocal] = React.useState(false);

  /* Отображение загрузки: */
  const [loading, setLoading] = React.useState(false);

  /* Получение данных с сервера: */
  useEffect(() => {
    async function fetchData() {
      try {
        /* Отобразить загрузку: */
        setLoading(true);
        /* Пробуем считать данные с сервера: */
        await fetch('http://localhost:3000/api/clients')
          .then(res => res.json())
          .then(data => setClients(data))
      } catch (err) {
        console.log('Сервер недоступен, работа с данными будет осуществляться через локальное хранилище')
        /* Если сервер недоступен, данные берутся из локального хранилища: */
        setIsLocal(true);
        localStorage.getItem('crm-clients') ? setClients(JSON.parse(localStorage.getItem('crm-clients'))) : localStorage.setItem('crm-clients', JSON.stringify([]));
      } finally {
        /* Убрать загрузку: */
        setLoading(false);
      }
    }
    fetchData();
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
      {loading && <Loading />}
      {!loading && <Table
        clients={clients}
        toggleModal={toggleModal}
        toggleDeleteModal={toggleDeleteModal}
        getId={client}
        inputData={props.inputData}
        setInputData={props.setInputData}
      />}
      {!loading && <button className="clients__button-add" onClick={() => toggleModal('add')}>
        <img src="crm-react/img/add_client.svg" alt="" />
        Добавить клиента
      </button>}
      <Modal
        clients={clients}
        isOpen={isModalOpen}
        toggleDeleteModal={toggleDeleteModal}
        toggleModal={toggleModal}
        modalKey={modalKey}
        clientId={clientId}
        setClients={setClients}
        isLocal={isLocal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleDeleteModal={toggleDeleteModal}
        clientId={clientId}
        setClients={setClients}
        isLocal={isLocal}
      />
    </main>
  )
}