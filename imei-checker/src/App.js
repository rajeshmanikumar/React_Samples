import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [imeival, setIMEIVal] = useState("");
  const [imeigivenval, setIMEIGivenVal] = useState(" ");
  const [imeicheckdigit, setIMEICheckDigit] = useState(" ");

    useEffect(() => {
      document.title = "IMEI Checker"
  }, []);

  const sumOfDigits = (number) => {
    var sum = 0;
    while(number > 0) {
      sum = sum + number%10;
      number = Math.floor(number/10);
    }
    return sum;
  }

  const calcCheckDigit = (imeiPrefix) => {
    var sum = 0;
    var modsum = 0;
    var i = 0;
    var lDigit;
    for(i = 13; i>=0; i=i-1) {
      lDigit = imeiPrefix.substring(i,i+1);
      if(i%2===0) {
          sum = parseInt(sum) + parseInt(lDigit);
      }else {
          sum = sum + sumOfDigits(lDigit*2);
      }
    }
    sum = sum * 9;
    modsum = sum%10
    return modsum;
  }

  const resetData = e => {
    setIMEIGivenVal("");
    setIMEICheckDigit("");
    setIMEIVal("");
  }

  const formData = e => {
      e.preventDefault();
      if (imeival.length === 14){
        setIMEIGivenVal(imeival);
        setIMEICheckDigit(calcCheckDigit(imeival));
      }
      else{
        alert ('Kindly enter IMEI without check digit - 14 digits')
      }  
  };


  return (
    <div className="app">
      <div className="fromData">
            <h1 className="headerInfo"> IMEI Check Digit Generator  </h1>
            <h2>Enter 14 digit IMEI without check digit:</h2>
            <form onSubmit={formData}>
                <div className="rowData">
                    <input 
                            onChange={(e) => setIMEIVal(e.target.value)}
                            value={imeival} 
                            placeholder="IMEI" 
                            className="form-control form-rounded"
                            type="number" />
                </div>
                <div className="actionButtons">
                  <button className="submitButton"> Submit </button>
                  <button className="submitButton" onClick={resetData}> Reset </button>
                </div>
            </form>
        </div>
        <div className="fromData"> 
          <h2> IMEI with check digit: {imeigivenval}<span className="h1Span">{imeicheckdigit}</span></h2>
        </div>
    </div>
  );
}

export default App;
