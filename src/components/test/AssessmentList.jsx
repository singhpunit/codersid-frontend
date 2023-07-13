import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { getAllTests } from '../../getdata/getdata';
import { headers } from '../../headers';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import '../../styles/student/studentlist.css';

const AssessmentList = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = alltestlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(alltestlist.length / recordsPerPage)
    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/assessment-test/${id}`)
    }

    useEffect(() => {
        getAllTests(headers)
            .then((response) => {
                setAllTestList(response.data.Tests);
            })
    }, []);

    return (
        <div className="m-2 assessment-list-card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Assessment List</p>
                </div>
            </div>
            <div className='scroll'>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Assessment Name</th>
                            <th scope="col">Assessment Category</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.testname}</td>
                                    <td>{item.category}</td>
                                    <td><button className='test-link-button' onClick={() => {
                                        handleDetails(item._id)
                                    }}>
                                        <p className='test-link-button-text'>Test Link</p>
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        {alltestlist.length !== 0 ?
                            <p className='fs-4'>No Data Found</p>
                            :
                            <BallTriangle
                                height={250}
                                width={300}
                                radius={5}
                                color="#10D1E3"
                                ariaLabel="ball-triangle-loading"
                                wrapperClassName=''
                                wrapperStyle=""
                                visible={true}
                            />
                        }
                    </div>
                    : null}

            </div>
            {currentRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
        </div>


    );
}

export default AssessmentList;
