import React, {useContext, useEffect, useState} from 'react'
import { List, arrayMove, arrayRemove  } from "react-movable";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DataColumns from '../data/DataContext';

const DragDropList = (props) => {
    
    const [column, setColumn] = useState(props.visibleColumns); 

    const handleDataColumnChange = () => {
        props.onColumnsChange(column);
    }

  return (
    <div className='select-display container-fluid d-flex justify-content-center'>
        <div className='card'>
            <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='fw-bold'>Select the fields to display</h5>
                <Link to='/'>
                    <FontAwesomeIcon className='btn' icon={faXmark}/>
                </Link>
            </div>
            <div className='card-body p-5 d-flex flex-column align-items-center justify-content-center'>
                <div>
                    <h6 className='column-info-text mb-3'>Column Info</h6>
                    {/* {items.map((item, i) => {
                        return( */}
                            <List
                            values={column}
                             onChange={({oldIndex, newIndex}) => 
                             setColumn(arrayMove(column, oldIndex, newIndex))
                            }
                            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                            renderItem={({ value, props, index, isDragged, inSelected }) => (
                                <li className='card-item bg-white d-flex justify-content-between align-items-center' {...props} >
                                    <div>{value}</div>
                                    <button className='btn shadow-none' onClick={() =>{
                                        setColumn(
                                        typeof index !== 'undefined' 
                                        ? arrayRemove(column, index)
                                        : column
                                        )
                                    }}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </li>
                            )}
                            />   
                        {/* )
                    })} */}
                    <div className='wrapper mt-4 d-flex justify-content-center align-items-center gap-3'>
                        <Link to="/" onClick={handleDataColumnChange} className='btn btn-primary btn-save'>Save</Link>
                        <button className='btn btn-white btn-cancle'>Cancle</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DragDropList
