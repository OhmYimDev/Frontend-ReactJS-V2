import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components';
import { useTable, usePagination, useColumnOrder } from 'react-table';
import makeData from '../dummyData.json';
import { useFlexLayout } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleLeft, 
    faAngleRight, 
    faAnglesLeft, 
    faAnglesRight, 
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const Styles = Styled.div`
    table {
        margin-bottom: 1rem;
    }
    td {
        display: flex;
        align-items: center;
    }
    `

const Table = ({ columns, data, visibleCol, columnsChange }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,

         canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        visibleColumns,
        setColumnOrder,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIdex: 1 },
        },
        usePagination,
        useFlexLayout,
        useColumnOrder
    )

    useEffect(() => {
        saveColumn();
    },[])

    const saveColumn = () => {
        const result = visibleColumns.map(data => data.id);
        visibleCol(result);    
    }

    useEffect(() => {
        setColumnOrder(columnsChange);
    },[])
        
    return (
        <div className='container-fluid'>
            <table className='table table-striped' {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody  {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr  {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        
            {/* Pagination */}
            <div className='pagiantion d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center gap-2'>
                    <button className='btn btn-dark' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <FontAwesomeIcon icon={faAnglesLeft}/>
                    </button>{' '}
                    <button className='btn btn-dark' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>{' '}
                    <button className='btn btn-dark' onClick={() => nextPage()} disabled={!canNextPage}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </button>{' '}
                    <button className='btn btn-dark me-2' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <FontAwesomeIcon icon={faAnglesRight}/>
                    </button>{' '}
                    <span>
                        Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '55px' }}
                    />
                    </span>{' '}
                </div>
                    
                <div className='d-flex align-items-center gap-2'>
                    <select
                        value={pageSize}
                        style={{ width: '55px' }}
                        onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}>
                    {[10, 20, 50, 75, 100].map(pageSize => (
                        <option  key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                    </select>
                    <span>
                        Page{' '}
                        {pageIndex + 1} of {pageOptions.length} from {data.length}
                    </span>
                </div>
            </div>
        </div>
    )
}
    

const DataTable = (props) => {

    const [columns, setColumns] = useState(props.columns);
    const [columnsChange, setColumnsChange] = useState(props.columnsChange);
    const handleVisibleColumns = (data) => {
        props.visibleColumnsData(data);
    }

    return (
        <Styles>
            <Table columns={columns} data={makeData} visibleCol={handleVisibleColumns} columnsChange={columnsChange}/>
        </Styles>
    )

}

export default DataTable
