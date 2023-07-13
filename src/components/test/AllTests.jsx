import { useState, useEffect } from "react";
import { getAllTests } from "../../getdata/getdata";
import { headers } from "../../headers";

const AllTests = () => {
    const [testlist, setTestList] = useState([]);
    const [alltestlist, setAllTestList] = useState([]);
    const [isselecttest, setIsSelectTest] = useState(false);

    let [value, setValue] = useState("");
    var score = 0;
    var val = 0;
    var flag = 0;
    const [totalscore, setTotalScore] = useState();

    useEffect(() => {
        getAllTests(headers)
            .then((response) => {
                setTestList(response.data.Tests);
                setAllTestList(response.data.Tests)
            })

    }, []);


    const addScore = (answer) => {
        console.log(value);
        console.log(answer);
        if (value === answer && flag === 0) {
            score = 1
            val = val + score;
            flag = 1;
        }
        else if (flag === 1 && value !== answer) {
            val = val - 1;
            flag = 0;
        }
        else {
            score = 0
        }
        console.log(score, typeof score);
        console.log(val);

        localStorage.setItem("score", val);
    }

    const getTotalScore = () => {
        localStorage.getItem("score");
        setTotalScore(localStorage.getItem("score"));
    }

    console.log(testlist);

    const handleTestSelect = (event) => {
        const testName = event.target.value;
        setIsSelectTest(true)
        console.log(testName)
        if (testName === 'Select Test') {
            setTestList([]);
            setIsSelectTest(false)
            console.log(testlist)
        }
        else {
            let data = alltestlist.filter((item, i) => {
                return item.testname === testName;
            })
            console.log(data[0].questionslist);
            if (data.length > 0) {
                setTestList(data[0].questionslist);
            }
            else {
                setTestList([])

            }
        }
    }



    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>All Tests</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <p className="text-start select-field-label">Select Test</p>
                    <select className="pay-fee-input-width mb-2 w-100" name="testname" id="testname" onChange={handleTestSelect}>
                        <option value="Select Test">Select Test</option>
                        {alltestlist.map((item) => {
                            return (
                                <option value={item.testname} >{item.testname}</option>
                            )

                        })}
                    </select>
                </div>
            </div>
            {isselecttest ?
                (
                    <>
                        {isselecttest && testlist.map((item) => {
                            return (
                                <div className="mt-2 mb-2">
                                    <p>Q{item.id}. {item.question}</p>
                                    <input type="radio" id={item.option1} name={item.question} value={item.option1}
                                        onClick={(event) => {
                                            value=item.option1
                                            addScore(item.answer)
                                        }} />
                                    <label className='ms-2 text-start fs-6' htmlFor="option1">{item.option1}</label><br />
                                    <input type="radio" id={item.option2} name={item.question} value={item.option2} 
                                    onClick={(event) => {
                                        value=item.option2
                                        addScore(item.answer)
                                    }}/>
                                    <label className='ms-2 text-start fs-6' htmlFor="option2">{item.option2}</label><br />
                                    <input type="radio" id={item.option3} name={item.question} value={item.option3} 
                                    onClick={(event) => {
                                        value=item.option3
                                        addScore(item.answer)
                                    }}/>
                                    <label className='ms-2 text-start fs-6' htmlFor="option3">{item.option3}</label><br />
                                    <input type="radio" id={item.option4} name={item.question} value={item.option4} 
                                    onClick={(event) => {
                                        value=item.option4
                                        addScore(item.answer)
                                    }}/>
                                    <label className='ms-2 text-start fs-6' htmlFor="option4">{item.option4}</label>
                                </div>
                            )
                        })}
                    </>
                ) : <div className="text-center">
                    <p className="fs-4">No Test Found</p>
                </div>
            }
            {/* {isselecttest ?
                <div>
                    <button className="btn btn-primary" onClick={getTotalScore}>Submit Test</button>
                    <p>{totalscore}</p>
                </div>
                : null} */}
        </div>
    );
}

export default AllTests;