import { useState, useEffect } from 'react';
import { addBatch, deleteBatch } from '../../postdata/postdata';
import { getAllBatches } from '../../getdata/getdata';
import { headers } from '../../headers';
import { toast } from "react-toastify";
import { BallTriangle } from 'react-loader-spinner';
import Pagination from '../pagination/Pagination';
import AddBatchIcon from '../../assets/AddBatch.png'
import '../../styles/batch/batch.css';

const AddBatch = () => {
    const [batchlist, setBatchList] = useState([])
    const [batchdata, setBatchdata] = useState({
        batchName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = batchlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(batchlist.length / recordsPerPage)
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const handleChange = (event) => {
        setBatchdata({
            ...batchdata,
            [event.target.name]: event.target.value
        })
    }

    const AddBatch = (event) => {
        event.preventDefault();
        addBatch(batchdata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                window.location.reload(false);
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    const DeleteBatch = (id) => {
        deleteBatch(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="card">
            <div className='d-flex'>
                <p className='ps-2 add-batch-card-text'>Add Batch</p>
                <img className='add-batch-icon' src={AddBatchIcon} alt="AddBatchIcon" />
            </div>

            <form onSubmit={AddBatch}>
                <div className='d-flex ps-2'>
                    <div>
                        <p className="text-start">Batch Name</p>
                        <input type="text" className="add-batch-input"
                            id="batchName" name="batchName"
                            onChange={handleChange} required />
                    </div>
                    <div>
                        <button className='add-batch-button' type='submit'>
                            <p className='add-batch-button-text'>Submit</p>
                        </button>
                    </div>
                </div>
            </form>

            <table className="table">
                <thead >
                    <tr>
                        <th scope="col">Batch List</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='ps-3'>{item.batchName}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteBatch(item._id)}>
                                        <p className='delete-button-text'>Delete</p>
                                    </button></td>
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

export default AddBatch;
