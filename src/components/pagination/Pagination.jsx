import React from 'react'
import { Link } from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io';
import {IoIosArrowForward} from 'react-icons/io';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <Link className="page-link" 
                        onClick={prevPage}>                       
                        <IoIosArrowBack/>
                    </Link>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                        <Link onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link'>   
                            {pgNumber}
                        </Link>
                    </li>
                ))}
                <li className="page-item">
                    <Link className="page-link" 
                        onClick={nextPage}>                        
                        <IoIosArrowForward/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination