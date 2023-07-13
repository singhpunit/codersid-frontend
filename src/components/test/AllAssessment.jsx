import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../../getdata/getdata';
import { headers } from '../../headers';
import { BallTriangle } from 'react-loader-spinner';
import JsLogo from '../../assets/JsLogo.png';
import MernLogo from '../../assets/MernLogo.png';
import NodeJSLogo from '../../assets/NodeJSLogo.jpg';
import ReactLogo from '../../assets/ReactLogo.png';
import { addExpiryDate, deleteAssessment } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { primaryUrl } from '../../baseurl';
import { Switch } from 'antd';
import Pagination from '../pagination/Pagination';
import '../../styles/assessment/assessmentlist.css';

const AllAssessment = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [alltests, setAllTests] = useState(true);
    const [reacttest, setReactTest] = useState(false);
    const [nodetest, setNodeTest] = useState(false);
    const [javascripttest, setJavascriptTest] = useState(false);
    const [merntest, setMernTest] = useState(false);
    const [loader, setLoader] = useState(false);
    const reacttestlist = alltestlist.filter((item) => {
        return item.category === "React JS"
    })

    const nodetestlist = alltestlist.filter((item) => {
        return item.category === "Node JS"
    })
    const javascripttestlist = alltestlist.filter((item) => {
        return item.category === "Javascript"
    })

    const merntestlist = alltestlist.filter((item) => {
        return item.category === "MERN Stack"
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = alltestlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentReactRecords = reacttestlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentNodeRecords = nodetestlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentJSRecords = javascripttestlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentMernRecords = merntestlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(alltestlist.length / recordsPerPage)
    const nPagesReact = Math.ceil(reacttestlist.length / recordsPerPage)
    const nPagesNode = Math.ceil(nodetestlist.length / recordsPerPage)
    const nPagesJS = Math.ceil(javascripttestlist.length / recordsPerPage)
    const nPagesMern = Math.ceil(merntestlist.length / recordsPerPage)
    const navigate = useNavigate();
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const expiryDate = date.toString()



    useEffect(() => {
        setLoader(true);
        getAllTests(headers)
            .then((response) => {
                setAllTestList(response.data.Tests);
                setLoader(false)
            })
    }, []);

    const handleQuestionDetails = (item) => {
        console.log(item);
        console.log(item.questionslist)
        localStorage.setItem('item', JSON.stringify(item));
        localStorage.setItem('questionlist', JSON.stringify(item.questionslist))
        navigate('/question-details', { state: { item } })
    }

    const copy = async (id) => {
        await navigator.clipboard.writeText(`${primaryUrl}/assessment-test/${id}`);
        toast.success("Test Link Copied", {
            position: "top-center",
            autoClose: 1000
        })
    }

    const enableLink = (id) => {
        const payload = {
            expiryDate: expiryDate
        }
        addExpiryDate(id, payload)
            .then((response) => {
                toast.success("Test Link Enabled Successfully", {
                    position: "top-center",
                    autoClose: 1000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    const disableLink = (id) => {
        const payload = {
            expiryDate: ""
        }
        addExpiryDate(id, payload)
            .then((response) => {
                toast.success("Test Link Disabled Successfully", {
                    position: "top-center",
                    autoClose: 1000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }


    const DeleteAssessment = (id) => {
        deleteAssessment(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    return (
        <div className="card">
            <div className="d-flex">
                <div className="" style={alltests ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(true);
                        setReactTest(false);
                        setNodeTest(false);
                        setJavascriptTest(false);
                        setMernTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">All Assessments</p>
                        <div className='text-center'><img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="" style={reacttest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(true);
                        setNodeTest(false);
                        setJavascriptTest(false);
                        setMernTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">React Assessment</p>
                        <div className='text-center'><img src={ReactLogo} alt="ReactLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="" style={nodetest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(false);
                        setNodeTest(true);
                        setJavascriptTest(false);
                        setMernTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">Node Assessment</p>
                        <div className='text-center'><img src={NodeJSLogo} alt="NodeJSLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="" style={javascripttest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(false);
                        setNodeTest(false);
                        setJavascriptTest(true);
                        setMernTest(false);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">JS Assessment</p>
                        <div className='text-center'><img src={JsLogo} alt="JsLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                <div className="" style={merntest ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(false);
                        setReactTest(false);
                        setNodeTest(false);
                        setJavascriptTest(false);
                        setMernTest(true)
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">MERN Assessment</p>
                        <div className='text-center'><img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
            </div>

            {alltests ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>
                            {currentRecords.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className='test-link-button me-2' onClick={() => {
                                                DeleteAssessment(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Delete</p>
                                            </button>
                                            <button className='test-link-button me-2' onClick={() => {
                                                copy(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Test Link</p>
                                            </button>

                                            {!(item.expiryDate === "") ? <Switch defaultChecked={!(item.expiryDate === "")}
                                                onChange={() => disableLink(item._id)} />
                                                : <Switch defaultChecked={!(item.expiryDate === "")} onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}


            {reacttest ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>
                            {currentReactRecords.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className='test-link-button me-2' onClick={() => {
                                                DeleteAssessment(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Delete</p>
                                            </button>
                                            <button className='test-link-button me-2' onClick={() => {
                                                copy(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Test Link</p>
                                            </button>
                                            {!(item.expiryDate === "") ? <Switch defaultChecked={!(item.expiryDate === "")}
                                                onChange={() => disableLink(item._id)} />
                                                : <Switch defaultChecked={!(item.expiryDate === "")} onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}


            {nodetest ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>
                            {currentNodeRecords.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className='test-link-button me-2' onClick={() => {
                                                DeleteAssessment(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Delete</p>
                                            </button>
                                            <button className='test-link-button me-2' onClick={() => {
                                                copy(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Test Link</p>
                                            </button>
                                            {!(item.expiryDate === "") ? <Switch defaultChecked={!(item.expiryDate === "")}
                                                onChange={() => disableLink(item._id)} />
                                                : <Switch defaultChecked={!(item.expiryDate === "")} onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}

            {javascripttest ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>
                            {currentJSRecords.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className='test-link-button me-2' onClick={() => {
                                                DeleteAssessment(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Delete</p>
                                            </button>
                                            <button className='test-link-button me-2' onClick={() => {
                                                copy(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Test Link</p>
                                            </button>
                                            {!(item.expiryDate === "") ? <Switch defaultChecked={!(item.expiryDate === "")}
                                                onChange={() => disableLink(item._id)} />
                                                : <Switch defaultChecked={!(item.expiryDate === "")} onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}

            {merntest ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>
                            {currentMernRecords.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className='test-link-button me-2' onClick={() => {
                                                DeleteAssessment(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Delete</p>
                                            </button>
                                            <button className='test-link-button me-2' onClick={() => {
                                                copy(item._id)
                                            }}>
                                                <p className='test-link-button-text'>Test Link</p>
                                            </button>
                                            {!(item.expiryDate === "") ? <Switch defaultChecked={!(item.expiryDate === "")}
                                                onChange={() => disableLink(item._id)} />
                                                : <Switch defaultChecked={!(item.expiryDate === "")} onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}

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

            {(reacttest && reacttestlist.length === 0) || (nodetest && nodetestlist.length === 0) ||
                (javascripttest && javascripttestlist.length === 0) ||
                (merntest && merntestlist.length === 0) ?
                <div className='text-center'>
                    <p className='mt-4 fs-4'>No Assessment Found</p>
                </div>
                : null}


            {alltests && currentRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}

            {reacttest && currentReactRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPagesReact}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
            {nodetest && currentNodeRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPagesNode}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
            {javascripttest && currentJSRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPagesJS}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}

            {merntest && currentMernRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPagesMern}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
        </div>
    );
}

export default AllAssessment;