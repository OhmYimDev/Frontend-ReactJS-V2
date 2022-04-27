import React, { useCallback, useState } from 'react';
import Styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import makeData from '../dummyData.json';
import { useFlexLayout } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faEllipsis, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const DataTable = () => {

    const Styles = Styled.div`

        table {
            margin-bottom: 1rem;
        }
        td {
            display: flex;
            align-items: center;
        }

    `
    const Table = ({ columns, data }) => {

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
            state: { pageIndex, pageSize },
        } = useTable(
            {
                columns,
                data,
                initialState: { pageIdex: 1 },
            },
            usePagination,
            useFlexLayout
        )

        return (
            <div  className='container-fluid'>
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


    const columns  = [
        {
            Header: 'ผู้ติดต่อ',
            accessor: 'avartar',
            Cell: () => <img src='https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'  alt=''></img>,
            width: 15,
        },
        {
            Header: 'ชื่อ',
            accessor: 'firstName',
            width: 30,
            minWidth: 30
        },
        {
            Header: 'นามสกุล',
            accessor: 'lastName',
            width: 30,
            minWidth: 30
        },
        {
            Header: 'บริษัท',
            accessor: 'companyName',
            width: 50,
            minWidth: 50
        },
        {
            Header: 'ติดต่อล่าสุด',
            accessor: 'date',
            width: 50,
            minWidth: 50
        },
        {
            Header: 'อีเมลล์',
            accessor: 'email',
            width: 50,
            minWidth: 50
        },
        {
            Header: 'ที่อยู่',
            accessor: 'city',
            width: 50,
            minWidth: 50

        },
        {
            Header: '',
            accessor: 'button',
            width: 50,
            Cell: () => (
                    <div className='dropdown'>
                        <button className=' btn btn-dark row-btn shadow-none dropdown-toggle' type='button' id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faEllipsis}/>
                        </button>
                        <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                            <li>
                            <div className='dropdown-item'>
                                <FontAwesomeIcon className='me-2' icon={faPencil}/>
                                Edit
                            </div>
                            </li>
                            <li>
                            <div className='dropdown-item'>
                                <FontAwesomeIcon className='me-2' icon={faTrashCan}/>
                                Delete
                            </div>
                            </li>
                        </ul>
                    </div>
            )        
        }
    ]

    return (
        <Styles>
            <Table columns={columns} data={makeData} />
        </Styles>
    )

}

export default DataTable
