import React from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { ColumnFilter } from "./ColumnFilter";
import { TableButtons } from "./TableButtons";

export function Table(props) {

  /* Данные клиентов в таблице: */
  const data = React.useMemo(
    () => [
      ...props.clients.map(client => {
        return {
          id: client.id,
          name: `${client.surname} ${client.name} ${client.lastName}`,
          createdAt: `${client.createdAt.slice(8, 10)}.${client.createdAt.slice(5, 7)}.${client.createdAt.slice(0, 4)} ${client.createdAt.slice(11, 13)}:${client.createdAt.slice(14, 16)}`,
          editedAt: `${client.updatedAt.slice(8, 10)}.${client.updatedAt.slice(5, 7)}.${client.updatedAt.slice(0, 4)} ${client.updatedAt.slice(11, 13)}:${client.updatedAt.slice(14, 16)}`,
        }
      })
    ],
    [props.clients]
  )

  /* Заполнение заголовков таблицы: */
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ cell }) =>
          <span style={{ color: "#B0B0B0" }}>
            {cell.row.values.id}
          </span>
      },
      {
        Header: 'Фамилия Имя Отчество',
        accessor: 'name'
      },
      {
        Header: 'Дата и время создания',
        accessor: 'createdAt',
        Cell: ({ cell }) =>
          <span style={{ color: "#B0B0B0" }}>
            {cell.row.values.createdAt}
          </span>
      },
      {
        Header: 'Последние изменения',
        accessor: 'editedAt'
      },
      /* Отобразить колонку контактов, когда они будут добавляться: */
      // {
      //   Header: 'Контакты',
      //   accessor: 'contacts',
      //   disableSortBy: true,
      // },
      {
        Header: 'Действия',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ cell }) => (
          <TableButtons
            toggleModal={props.toggleModal}
            toggleDeleteModal={props.toggleDeleteModal}
            id={cell.row.values.id}
            getId={props.getId}
          />
        )
      },
    ],
    [props.toggleModal, props.toggleDeleteModal, props.getId]
  )

  /* Задание параметров таблицы: */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  )

  const { globalFilter } = state

  return (
    <>
      <ColumnFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        inputData={props.inputData}
      />
      <table className="clients__container" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                /* Добавление сортировки по нажатию: */
                <th {...column.getHeaderProps(column.getSortByToggleProps({ title: undefined }))}>
                  {column.render('Header')}
                  {/* Добавление стрелочки сортировки: */}
                  <span className="sort__arrow">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '🠕'
                        : '🠗'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}