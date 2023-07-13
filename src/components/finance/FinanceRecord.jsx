import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import '../../styles/finance/finance.css';
let options = {
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
    },
    stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },

    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    markers: {
        size: 0
    },
    xaxis: {
        title: {
            text: 'Months',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                color: '#263238'
            },
        }
    },
    yaxis: {
        title: {
            text: 'Rupees',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                color: '#263238'
            },
        },
        min: 0
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return "<span>&#x20B9; </span>" + y.toFixed(0) + " /-";
                }
                return y;

            }
        }
    }
}

const FinanceRecord = () => {
    const [series, setSeries] = useState([])
    const [studentlist, setStudentList] = useState([]);
    const [expensedata, setExpenseData] = useState([]);
    const [allstudentlist, setAllStudentList] = useState([]);
    const [allexpensedata, setAllExpenseData] = useState([]);
    const [fromdate, setfromDate] = useState();
    const [salesvalue, setSalesRecords] = useState();
    const [expensevalue, setExpenseRecords] = useState();

    let sales = 0;
    let expenses = 0;
    const totalSales = studentlist.map((item) => {
        return sales = sales + parseInt(item.Amount);

    })

    

    let grandtotalSales = totalSales[studentlist.length - 1]
    if (studentlist.length === 0) {
        grandtotalSales = 0
    }

    const totalExpenses = expensedata.map((item) => {
        return expenses = expenses + parseInt(item.Amount);

    })
    let grandtotalExpenses = totalExpenses[expensedata.length - 1];
    if (expensedata.length === 0) {
        grandtotalExpenses = 0
    }
    

    console.log(salesvalue);
    console.log(expensevalue);
    console.log(grandtotalSales);
    console.log(grandtotalExpenses);

    const calculateProfit = () => {
        if (studentlist.length === 0) {
            return salesvalue - grandtotalExpenses
        }
        else if (expensedata.length === 0) {
            return grandtotalSales - expensevalue
        }
        else {
            return grandtotalSales - grandtotalExpenses
        }
    }

    const profit = calculateProfit();
    
    useEffect(() => {
        axios.get("https://codersid-backend.vercel.app/api/paymentrecords").then((res) => {
            setStudentList(res.data.Payments)
            setAllStudentList(res.data.Payments)
            setExpenseData(res.data.Expenses)
            setAllExpenseData(res.data.Expenses)
            let sale = dataprocess("sale", res.data.Payments)
            console.log(sale)
            let expenses = dataprocess("Expenses", res.data.Expenses)
            let profitData = []
            for (let i = 0; i < sale.data.length; i++) {
                profitData.push(sale.data[i] - expenses.data[i])
            }
            let seriesData = [sale, expenses, { name: "profit/loss", data: [...profitData], type: 'line', }]
            console.log(seriesData)
            console.log(seriesData[0].data[4])
            setSeries(seriesData)


        }).catch(err => {
            console.log(err)
        })
    }, [])

    const dataprocess = (type, data) => {
        let allData = data
        console.log(allData)
        for (let i = 0; i < allData.length; i++) {
            allData[i].month = dateFormat(allData[i].createdAt)
        }
        let monthly = groupBy("month", allData)
        console.log(monthly)
        let monthlyTotal = []
        let obj = Object.keys(monthly)
        for (let i = 0; i < obj.length; i++) {
            let total = 0
            monthly[obj[i]].forEach(v => {
                total += v.Amount
            })
            console.log(total)
            monthlyTotal.push(total)
        }
        console.log(monthlyTotal)
        let seriesData =
            { name: type, data: [...monthlyTotal], type: "column" }


        console.log(seriesData)
        return seriesData

    }

    const groupBy = (name, arr) => {
        let obj = { "Jan": [], 'Feb': [], 'Mar': [], 'Apr': [], 'May': [], 'Jun': [], 'Jul': [], 'Aug': [], 'Sep': [], 'Oct': [], 'Nov': [], 'Dec': [] }
        for (let i = 0; i < arr.length; i++) {
            if (obj[arr[i][name]]) {
                obj[arr[i][name]].push(arr[i])
            }
            else {
                obj[arr[i][name]] = [arr[i]]
            }
        }

        return obj
    }

    const dateFormat = (val) => {
        let m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let date = new Date(val).getMonth()
        return m[date]
    }

    const handleFromDate = (event) => {
        const fromDate = event.target.value
        setfromDate(fromDate)
        let salesdata = allstudentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromDate;
        })
        let expenserecords = allexpensedata.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromDate;
        })

        if (salesdata.length === 0) {
            setSalesRecords(0)
        }
        if (expenserecords.length === 0) {
            setExpenseRecords(0)
        }

        setStudentList(salesdata);
        setExpenseData(expenserecords);
        let sale = dataprocess("sale", salesdata);
        let expenses = dataprocess("expenses", expenserecords);
        let profitData = []
        for (let i = 0; i < sale.data.length; i++) {
            profitData.push(sale.data[i] - expenses.data[i])
        }
        let seriesData = [sale, expenses, { name: "profit/loss", data: [...profitData], type: 'line', }]
        console.log(seriesData)
        setSeries(seriesData)

    }


    const handleToDate = (event) => {
        const toDate = event.target.value
        let salesdata = allstudentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromdate && item.createdAt.substring(0, 10) <= toDate
        })
        let expenserecords = allexpensedata.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromdate && item.createdAt.substring(0, 10) <= toDate;
        })
        if (salesdata.length === 0) {
            setSalesRecords(0)
        }
        if (expenserecords.length === 0) {
            setExpenseRecords(0)
        }
        setStudentList(salesdata);
        setExpenseData(expenserecords);
        let sale = dataprocess("sale", salesdata);
        let expenses = dataprocess("expenses", expenserecords);
        let profitData = []
        for (let i = 0; i < sale.data.length; i++) {
            profitData.push(sale.data[i] - expenses.data[i])
        }
        let seriesData = [sale, expenses, { name: "profit/loss", data: [...profitData], type: 'line', }]
        console.log(seriesData)
        setSeries(seriesData)
    }

    const ClearFilter = () => {
        window.location.reload(false);
    }


    return (
        <div className="card">
            <div className="row ps-2">
                <div className="col-sm-5">
                    <p className="text-start select-field-label">Select From Date</p>
                    <input type="date" className="payment-records-input-width w-100" id="fromDate" name="fromDate"
                        onChange={handleFromDate} />
                </div>
                <div className="col-sm-5">
                    <p className="text-start select-field-label">Select To Date</p>
                    <input type="date" className="payment-records-input-width w-100" id="toDate" name="toDate"
                        onChange={handleToDate} />
                </div>
                <div className="col-sm-2">
                    <button className='add-student-button clear-filter-button' onClick={ClearFilter}>
                        <p className="add-student-button-text">Clear Filter</p>
                    </button>
                </div>
            </div>
            <div className="d-flex">
                <div className="finance-card">
                    <div className="card-body">
                        <p className="fs-4 fw-bold">&#x20B9; {studentlist.length === 0 ? salesvalue : grandtotalSales}/-</p>
                        <p className="fs-5">Sales</p>
                    </div>
                </div>
                <div className="finance-card">
                    <div className="card-body">
                        <p className="fs-4 fw-bold">&#x20B9; {expensedata.length === 0 ? expensevalue : grandtotalExpenses}/-</p>
                        <p className="fs-5">Expenses</p>
                    </div>
                </div>
                <div className="finance-card">
                    <div className="card-body">
                        <p className="fs-4 fw-bold">&#x20B9; {profit}/-</p>
                        <p className="fs-5">{profit < 0 ? "Loss" : "Profits"}</p>
                    </div>
                </div>
            </div>

            <Chart options={options} series={series} type="line" width={"100%"} height={320} />

        </div>



    );
}

export default FinanceRecord;
