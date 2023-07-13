import { useState, useEffect } from 'react';
import { getAllCourses } from '../../getdata/getdata';
import { addCourse, deleteCourse } from '../../postdata/postdata';
import { headers } from '../../headers';
import { toast } from "react-toastify";
import { BallTriangle } from 'react-loader-spinner';
import Pagination from '../pagination/Pagination';
import AddCourseLogo from '../../assets/AddCourse.png';
import '../../styles/course/course.css';

const AddCourse = () => {
    const [courselist, setCourseList] = useState([])
    const [coursedata, setCoursedata] = useState({
        courseName: "",
        coursePrice: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = courselist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(courselist.length / recordsPerPage)
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getAllCourses(headers)
            .then((response) => {
                setCourseList(response.data.Courses);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleChange = (event) => {
        setCoursedata({
            ...coursedata,
            [event.target.name]: event.target.value
        })
    }

    const AddCourse = (event) => {
        event.preventDefault();
        addCourse(coursedata)
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

    const DeleteCourse = (id) => {
        deleteCourse(id)
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
                <p className='ps-2 add-course-card-text'>Add Course</p>
                <img className='add-course-icon' src={AddCourseLogo} alt="AddCourseLogo" />
            </div>

            <form onSubmit={AddCourse}>
                <div className='row ps-2'>
                    <div className='col-sm-4'>
                        <p className="text-start">Course Name</p>
                        <input type="text" className="add-course-input w-100"
                            id="courseName" name="courseName"
                            onChange={handleChange} required />
                    </div>
                    <div className='col-sm-4'>
                        <p className="text-start">Course Price</p>
                        <input type="text" className="add-course-input w-100"
                            id="coursePrice" name="coursePrice"
                            onChange={handleChange} required />
                    </div>
                    <div className='col-sm-4'>
                        <button className='add-course-button' type='submit'>
                            <p className='add-course-button-text'>Submit</p>
                        </button>
                    </div>
                </div>

            </form >

            <table className="table">
                <thead>
                    <tr>
                        <th className='ps-3' scope="col">Course List</th>
                        <th className='ps-3' scope="col">Course Price</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='ps-3'>{item.courseName}</td>
                                <td className='ps-4'>{item.coursePrice}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteCourse(item._id)}>
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

                : null
            }
        </div >
    );
}

export default AddCourse;
