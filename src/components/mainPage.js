import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAngleDown, 
  faAngleLeft, 
  faBars, 
  faChartLine, 
  faDisplay, 
  faFileSignature, 
  faFilter, 
  faGear, 
  faMapPin, 
  faPlus,
  faEllipsis, 
  faPencil 
} from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import DataTable from './dataTable';
import { Routes, Route, Link } from "react-router-dom";
import DragDropList from './dragDropList';
import DataColumns from '../data/DataContext';

const MainPage = () => {
  
  const [columns, setColumns] = useState([
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
])

    const [isActive, setIsActive] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [columnsChange, setColumnsChange] = useState([]);

    const handleSidebarToggle = () => {
      setIsActive(!isActive);
    } 

    const handleVisibleColumns = (visibleColumns) => {
      setVisibleColumns(visibleColumns);
    }

    const handleColumnsChange = (data) => {
      setColumnsChange(data);
    }
    console.log("Columns : ", columns);

  return (
    //<DataColumns.Provider>
      <div className='maincontainer d-flex' >
        <div id='sidebar' className={`vertical-nav bg-dark ${isActive ? "active" : ""}`}>
            <div className='py-4 px-3 mb-4'>
                <div className='heading d-flex align-items-center justify-content-between'>
                    <h6 className='fw-bold text-white'>Contact</h6>
                    <div onClick={handleSidebarToggle} className='icon-wrapper d-flex gap-1'>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        <FontAwesomeIcon icon={faBars}/>
                    </div>
                </div>

                <ul className='nav flex-column mb-0 d-flex'>
                    <li className='nav-item'>
                        <a href='#' className='nav-link text-white ps-0'>
                          <FontAwesomeIcon className='me-2' icon={faChartLine} />
                          Dashbord
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='#' className='nav-link text-white ps-0'>
                          <FontAwesomeIcon className='me-2' icon={faAddressBook} />
                          Contact Person List
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='#' className='nav-link text-white ps-0'>
                          <FontAwesomeIcon className='me-2' icon={faFileSignature} />
                          Report
                        </a>
                    </li>
                    <li className='nav-item dropdown'>
                        <button className='shadow-none btn text-white ps-0 dropdown-toggle' type="button" data-bs-toggle="dropdown" data-bs-target="#collapseExample">
                          <FontAwesomeIcon className='me-2' icon={faGear} />
                          Setting
                        </button>
                        <ul className='dropdown-menu ps-4 ' id="collapseExample">
                          <li><a className='dropdown-item ps-0 text-white text-decoration-none' href='#'>Manage Layout</a></li>
                          <li><a className='dropdown-item ps-0 text-white text-decoration-none' href='#'>Member</a></li>
                          <li><a className='dropdown-item ps-0 text-white text-decoration-none' href='#'>Data Access</a></li>
                          <li><a className='dropdown-item ps-0 text-white text-decoration-none' href='#'>System log</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div className={`page-content py-4 ${isActive ? "active" : ""}`} id="content">
          <nav className='nav container-fluid d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon onClick={handleSidebarToggle} id='btn-sidebar' className={`icon-toggle fs-5 me-3 text-gray ${isActive ? "display-none" : ""}`} icon={faBars}/>
              <h5 className='fw-bold m-0'>Contact Person List</h5>
              <FontAwesomeIcon className='heading-icon p-2 ms-3 rounded' icon={faAngleDown}/>
            </div>

            <div className='d-flex align-items-center'>
              <button type='button' className='shadow-none me-2 btn nav-btn py-1 d-flex align-items-center'>
                <FontAwesomeIcon className='me-2' icon={faPlus}/>
                Add Contact Person
              </button>
              <button type='button' className='shadow-none me-3 btn nav-btn py-1 d-flex align-items-center'>
                Imported
              </button>
              <FontAwesomeIcon className='fs-4 icon-setting' icon={faGear} />
            </div>
          </nav>

          <nav className='nav-filter my-3 container-fluid d-flex align-items-center justify-content-between'>
            <div className='text-wrapper py-3 d-flex align-items-center'>
              <h6 className='m-0 fw-bold me-2'>Filter Data:</h6>
              <span>Costomer 2021</span>
            </div>

            <div className='menu-wrapper d-flex align-item-center'>
              <FontAwesomeIcon className='fs-4 icon-pin p-2 rounded' icon={faMapPin}/>
              <div className='dropdown'>
                <button className='btn nav-btn dropdown-toggle ms-2 d-flex align-items-center shadow-none' type='button' id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon className='fs-4' icon={faPenToSquare}/>
                  <FontAwesomeIcon className='fs-6 ms-2' icon={faAngleDown}/>
                </button>
                <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link to='/selectDisplay' className='dropdown-item'>
                      <FontAwesomeIcon className='me-2' icon={faDisplay}/>
                      Select to display
                    </Link>
                  </li>
                  <li>
                    <div className='dropdown-item'>
                      <FontAwesomeIcon className='me-2' icon={faFilter}/>
                      Filter
                    </div>
                  </li>
                  <li>
                    <div className='dropdown-item'>
                      <FontAwesomeIcon className='me-2' icon={faTrashCan}/>
                      Delete this filter
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path='/' element={<DataTable columns={columns} visibleColumnsData={handleVisibleColumns} columnsChange={columnsChange}/>}/>
            <Route path='selectDisplay' element={<DragDropList visibleColumns={visibleColumns} onColumnsChange={handleColumnsChange} />} />
          </Routes>
          
        </div>
      </div>

    //</DataColumns.Provider>
  )
}

export default MainPage;
