import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleQuestion, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  return (
      <nav className='navbar navbar-light bg-light p-2 shadow'>
          <div className='container-fluid'>
            {/* logo brand */}
            <div className='navbar-brand d-flex gap-3'>
                <img src='https://icon-library.com/images/logo-icon-png/logo-icon-png-11.jpg' alt='logo' className='logo'/>
                <div className='text-wrapper'>
                    <h6 className='m-0 fw-bold'>Company's name</h6>
                    <p className='slogan m-0 text-muted'>slogan of the company</p>
                </div>
            </div>

            <div className='d-flex align-items-center'>
                {/* search */}
                <div className='search d-flex'>
                    <i className="fa-solid fa-magnifying-glass text-center"></i>
                    <input className='search-input form-control shadow-none' placeholder='Search' aria-label="Search" />
                </div>
                {/* menus */}
                <div className='menu-group d-flex gap-4'>
                    <a href='#'>
                        <FontAwesomeIcon className='menu-icon' icon={faCommentDots} />
                    </a>
                    <a href='#'>
                        <FontAwesomeIcon className='menu-icon' icon={faBell} />
                    </a>
                    <a href='#'>
                        <FontAwesomeIcon className='menu-icon' icon={faCircleQuestion}/>
                    </a>
                    <a href='#'>
                        <FontAwesomeIcon className='menu-icon' icon={faBars}/>
                    </a>
                    <a href='#'>
                        <img src="https://cdn-icons-png.flaticon.com/512/2960/2960006.png" className="menu-icon-user" />
                    </a>
                </div>
            </div>

          </div>
      </nav>
  )
}

export default Navbar
