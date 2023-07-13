import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { getAllLeads } from '../../getdata/getdata';
import { headers } from '../../headers';
import LeadImage from '../../assets/LeadImage.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { BsInfoCircle } from 'react-icons/bs';
import { Modal } from "react-bootstrap";
import { BallTriangle } from 'react-loader-spinner';
import { CSVLink } from "react-csv";
import AddLead from './AddLead';
import EditLead from './EditLead';
import { useNavigate } from 'react-router-dom';
import '../../styles/student/studentlist.css';
import '../../styles/leads/lead.css';


const AllLeads = () => {
    const [leadList, setLeadList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [addleadmodal, setAddLeadModal] = useState(false);
    const [editleadmodal, setEditLeadModal] = useState(false);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = leadList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(leadList.length / recordsPerPage)
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();


    const allleadsCount = leadList.length;
    const followupleadsCount = leadList.filter((item) => {
        return item.status === "Followup"
    });
    const coldReachOutleadsCount = leadList.filter((item) => {
        return item.status === "Cold Reach out"
    });
    const convertedleadsCount = leadList.filter((item) => {
        return item.status === "Converted"
    });
    const notInterestedleadsCount = leadList.filter((item) => {
        return item.status === "Not Interested/ Permanently Lost"
    });
    const walkInleadsCount = leadList.filter((item) => {
        return item.status === "Walk In"
    });


    const handleAddLeadModal = () => {
        setAddLeadModal(true)
    };

    const handleEditLeadModal = (id) => {
        setEditLeadModal(id)
    };

    const handleDetails = (item) => {
        navigate('/lead-details', { state: { item } })
    }

    const closeAddLeadModal = () => setAddLeadModal(false);
    const closeEditLeadModal = () => setEditLeadModal(false);

    useEffect(() => {
        setLoader(true);
        getAllLeads(headers)
            .then((response) => {
                setLeadList(response.data.Leads);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const headers1 = [
        { label: "Name", key: 'name' },
        { label: "Contact", key: 'contactdetails' },
        { label: "Email", key: 'emailid' },
        { label: "City", key: 'city' },
        { label: "Address", key: 'address' },
        { label: "Education", key: 'education' },
        { label: "Employment Status", key: 'employementStatus' },
        { label: "Status", key: 'status' },
        { label: "Source", key: 'source' },
    ]

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>All Leads<img className='leadlist-icon' src={LeadImage} alt="LeadImage" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button me-1'>
                        <CSVLink data={leadList} headers={headers1} filename='Leads_Records.csv'
                            className='add-student-button-text text-decoration-none'>Export Data</CSVLink>
                    </button>
                    <button className='add-student-button' onClick={() => {
                        handleAddLeadModal()
                    }}>
                        <p className='add-student-button-text'>Add Leads + </p>
                    </button>
                    <Modal show={addleadmodal ? true : false} onHide={closeAddLeadModal}>
                        <AddLead closeAddLeadModal={closeAddLeadModal} />
                    </Modal>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <div className='ms-2 me-2'>
                    <p className="fs-5 fw-bold text-center">All Leads</p>
                    <p className="fs-5 text-center">{allleadsCount}</p>
                </div>
                <div className='ms-2 me-2'>
                    <p className="fs-5 fw-bold text-center">Followup</p>
                    <p className="fs-5 text-center">{followupleadsCount.length}</p>
                </div>
                <div className='ms-2 me-2'>
                    <p className="fs-5 fw-bold text-center">Cold Reach out</p>
                    <p className="fs-5 text-center">{coldReachOutleadsCount.length}</p>
                </div>
                <div className='ms-2 me-2'>
                    <p className="fs-5 fw-bold text-center">Converted</p>
                    <p className="fs-5 text-center">{convertedleadsCount.length}</p>
                </div>
                <div className='ms-2 me-2'>
                    <p className="fs-5 fw-bold text-center">Not interested/Permanently Lost</p>
                    <p className="fs-5 text-center">{notInterestedleadsCount.length}</p>
                </div>
                <div className='ms-2 me-2'>
                    <p className="fs-5 fw-bold text-center">Walkins</p>
                    <p className="fs-5 text-center">{walkInleadsCount.length}</p>
                </div>
            </div>
            {/* <div className="d-flex">
                <div className="leads-details-card">
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">All Leads</p>
                        <p className="fs-5 text-center">{allleadsCount}</p>
                    </div>
                </div>
                <div className="leads-details-card">
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Followup</p>
                        <p className="fs-5 text-center">{followupleadsCount.length}</p>
                    </div>
                </div>
                <div className="leads-details-card">
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Cold Reach out</p>
                        <p className="fs-5 text-center">{coldReachOutleadsCount.length}</p>
                    </div>
                </div>
                <div className="leads-details-card">
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Converted</p>
                        <p className="fs-5 text-center">{convertedleadsCount.length}</p>
                    </div>
                </div>
                <div className="leads-details-card">
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Not interested</p>
                        <p className="fs-5 text-center">{notInterestedleadsCount.length}</p>
                    </div>
                </div>
                <div className="leads-details-card">
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Walkins</p>
                        <p className="fs-5 text-center">{walkInleadsCount.length}</p>
                    </div>
                </div>
            </div> */}

            <div className='scroll'>
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            <th scope="col">Status</th>
                            <th scope="col">Source</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.contactdetails}</td>
                                    <td>{item.emailid}</td>
                                    <td>{item.city}</td>
                                    <td>{item.status}</td>
                                    <td>{item.source}</td>
                                    <td>
                                        <div className="d-flex ms-4">
                                            <Tippy content={<span>{item.comments[item.comments.length - 1].comment}</span>}>
                                                <button className='info-button'>
                                                    <BsInfoCircle className='info-button-icon' />
                                                </button>
                                            </Tippy>
                                            <button className='ms-2 details-button' onClick={() => {
                                                handleEditLeadModal(item._id)
                                            }}>
                                                <p className='details-button-text'>Update</p>
                                            </button>
                                            <button className='ms-2 details-button' onClick={() => {
                                                handleDetails(item)
                                            }}>
                                                <p className='details-button-text'>Details</p>
                                            </button>
                                        </div>
                                        <Modal show={editleadmodal === item._id ? true : false} onHide={closeEditLeadModal}>
                                            <EditLead data={item} id={item._id} closeEditLeadModal={closeEditLeadModal} />
                                        </Modal>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {loader ?
                    <div className="d-flex justify-content-center">
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
                    </div> : null}

                {!loader && currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <p className='fs-4'>No Data Found</p>
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

export default AllLeads;
