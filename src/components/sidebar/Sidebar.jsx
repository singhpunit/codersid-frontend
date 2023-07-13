import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLogo from '../../assets/SidebarLogo.png';
import DashboardIcon from '../../assets/DashboardIcon.png';
import StudentIcon from '../../assets/Studentlist.png';
import MasterIcon from '../../assets/MasterIcon.png';
import MasterArrowIcon from '../../assets/MasterArrowIcon.png';
import ListIcon from '../../assets/ListIcon.png';
import PaymentIcon from '../../assets/PaymentIcon.png';
import ExpenseManageIcon from '../../assets/ExpenseManageIcon.png';
import FinanceIcon from '../../assets/FinanceIcon.png';
import LeadImage from '../../assets/LeadImage.png';
import FeedbackIcon from '../../assets/FeedbackIcon.png';
import '../../styles/sidebar/sidebar.css';

const Sidebar = () => {
    const [showMaster, setShowMaster] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showLeads, setShowLeads] = useState(false);
    const [showTest, setShowTest] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const role = localStorage.getItem('role');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleMaster = () => {
        setShowMaster(!showMaster)
    }

    const handlePayment = () => {
        setShowPayment(!showPayment)
    }

    const handleLeads = () => {
        setShowLeads(!showLeads)
    }

    const handleTest = () => {
        setShowTest(!showTest)
    }

    const handleFeedback = () => {
        setShowFeedback(!showFeedback)
    }

    return (
        <div className="sidebar ">
            <div className="d-flex">
                <img className='sidebar-logo' src={SidebarLogo} alt="SidebarLogo" />
                <p className='sidebar-text'>{role === 'admin' ? "Welcome Admin" : "Welcome User"}</p>
            </div>
            <div className='sidebar-line'></div>
            <div className='d-flex'>
                <img className='dashboard-text-icon' src={DashboardIcon} alt="DashboardIcon" />
                <NavLink className='sidebar-item-1' to='/dashboard'>Dashboard</NavLink>
            </div>
            {role === 'admin' || user[0].permission.includes('CodersID Students') ?
                <div className='d-flex'>
                    <img className='codersid-students-icon' src={StudentIcon} alt="StudentIcon" />
                    <NavLink className='sidebar-item-2' to='/students-list'>CodersID Students</NavLink>
                </div>
                : null}

            {role === 'admin' || user[0].permission.includes('Master') ?
                <>
                    <div className='d-flex'>
                        <img className='master-text-icon' src={MasterIcon} alt="MasterIcon" />
                        <p className='sidebar-item-3' onClick={handleMaster}>Master</p>
                        <img className='master-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>

                    {
                        showMaster ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-batch-text' to='/add-batch'>Add Batch</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-2' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-user-text' to='/user-list'>Add User</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-3' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-course-text' to='/add-course'>Add Course</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/add-expense-category'>Add Expense Category</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/add-assessment-category'>Add Assessment Category</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/feedback-category'>Feedback Category</NavLink>
                                </div>
                            </>
                            : null
                    }

                </>
                : null}

            {role === 'admin' || user[0].permission.includes('Leads') ?
                <>
                    <div className='d-flex'>
                        <img className='lead-icon' src={LeadImage} alt="LeadImage" />
                        <p className='sidebar-item-4' onClick={handleLeads}>Leads</p>
                        <img className='lead-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>
                    {
                        showLeads ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-batch-text' to='/all-leads'>All Leads</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-2' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-user-text' to='/followup'>Followup</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-3' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-course-text' to='/cold-reach-out'>Cold Reach out</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/convered-leads'>Converted</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/lost-leads'>Not Interested/ Permanently Lost.</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-4' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='add-expense-text' to='/walk-in'>Walk-Ins</NavLink>
                                </div>
                            </>
                            : null
                    }
                </>
                : null}



            {role === 'admin' || user[0].permission.includes('Payment') ?
                <>
                    <div className='d-flex'>
                        <img className='payment-icon' src={PaymentIcon} alt="PaymentIcon" />
                        <p className='payment-text' onClick={handlePayment}>Payment</p>
                        <img className='payment-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>
                    {
                        showPayment ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/payment-records'>Payment Records</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-6' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payfee' to='/payment'>Pay Fee</NavLink>
                                </div>
                            </>
                            : null
                    }
                </>
                : null}

            {role === 'admin' || user[0].permission.includes('Manage Expense') ?
                <div className="d-flex">
                    <img className='sidebar-expense-manage-icon' src={ExpenseManageIcon} alt="ExpenseManageIcon" />
                    <NavLink className='expense-management' to='/manage-expense'>Manage Expense</NavLink>
                </div>
                : null}

            {role === "admin" || user[0].permission.includes('Finance') ?
                <div className="d-flex">
                    <img className='sidebar-expense-manage-icon' src={FinanceIcon} alt="FinanceIcon" />
                    <NavLink className='expense-management' to='/finance'>Finance</NavLink>
                </div> : null}

            {role === 'admin' || user[0].permission.includes('Assessment') ?
                <>
                    <div className='d-flex'>
                        <img className='payment-icon' src={PaymentIcon} alt="PaymentIcon" />
                        <p className='payment-text' onClick={handleTest}>Assessment</p>
                        <img className='assessment-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>
                    {
                        showTest ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/create-test'>Create Assessment</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/all-tests'>All Assessments</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/performance'>Student Performance</NavLink>
                                </div>
                            </>
                            : null
                    }
                </>
                : null}


            {role === 'admin' || user[0].permission.includes('Feedbacks') ?
                <>
                    <div className='d-flex'>
                        <img className='payment-icon' src={FeedbackIcon} alt="FeedbackIcon" />
                        <p className='payment-text' onClick={handleFeedback}>Feedbacks</p>
                        <img className='feedback-arrow-icon' src={MasterArrowIcon} alt="MasterArrowIcon" />
                    </div>
                    {
                        showFeedback ?
                            <>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/create-feedback'>Create Feedback</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/all-feedback'>All Feedbacks</NavLink>
                                </div>
                                <div className="d-flex">
                                    <img className='list-icon-5' src={ListIcon} alt="ListIcon" />
                                    <NavLink className='payment-records' to='/feedbacks'>Student Feedbacks</NavLink>
                                </div>
                            </>
                            : null
                    }
                </>
                : null}
        </div>
    );
}

export default Sidebar
