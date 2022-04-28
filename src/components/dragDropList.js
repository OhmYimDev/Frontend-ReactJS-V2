import React, {useEffect, useState} from 'react'
import { List, arrayMove, arrayRemove  } from "react-movable";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const DragDropList = ({enteredColumn, data}) => {
    
    // const [items, setItems] = useState([]);  
    const [makeItems, setMakeItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4","Item 5","Item 6"]); 
     
    // useEffect(() => {
    //     setItems(props.data);
    // },[])
    // console.log('Set Items :', items);

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
                            values={makeItems}
                             onChange={({oldIndex, newIndex}) => 
                             setMakeItems(arrayMove(makeItems, oldIndex, newIndex))
                            }
                            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                            renderItem={({ value, props, index, isDragged, inSelected }) => (
                                <li className='card-item bg-white d-flex justify-content-between align-items-center' {...props} >
                                    <div>{value}</div>
                                    <button className='btn shadow-none' onClick={() =>{
                                        setMakeItems(
                                        typeof index !== 'undefined' 
                                        ? arrayRemove(makeItems, index)
                                        : makeItems
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
                        <Link to="/" className='btn btn-primary btn-save' onClick={() => {
                            enteredColumn(makeItems)
                        }}>Save</Link>
                        <button className='btn btn-white btn-cancle'>Cancle</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DragDropList
