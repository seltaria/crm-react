import React from "react";

export const ColumnFilter = ({ filter, setFilter, inputData }) => {

  React.useEffect(() => setFilter(inputData)
    , [inputData, setFilter])

  return (
    <input
      className="header__search column-filter"
      placeholder="Введите запрос"
      value={filter || ''}
      // onChange={(e) => setFilter(e.target.value)} />
      readOnly
    />
  )
}