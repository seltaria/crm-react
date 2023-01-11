import React from "react";

export function TableButtons(props) {

  function onEditClick() {
    props.toggleModal('edit')
    props.getId(props.id)
  }

  function onDeleteClick() {
    props.toggleDeleteModal('delete')
    props.getId(props.id)
  }

  return (
    <div className="table__buttons">
      <button className="table__change" onClick={onEditClick}>
        Изменить
      </button>
      <button className="table__delete" onClick={onDeleteClick}>
        <img src="crm-react/img/delete.svg" alt="del"></img>
        Удалить
      </button>
    </div>
  )
}