import React, { useState, useEffect } from 'react';
import "./progresser.css"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { bookingStore } from '../../../zustand/store';

const steps = [
  'Contact Details',
  'Event Requirements',
  'Payment',
];

function Progresser() {

  const bookingGlobalState = bookingStore(state => state.bookingGlobalState);
  const setGlobalState = bookingStore(state => state.setGlobalState);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (bookingGlobalState === "personal")
      setStep(0);
    else if (bookingGlobalState === "required")
      setStep(1);
    else if (bookingGlobalState === "payment")
      setStep(2);
  }, [bookingGlobalState])

  const goBack = () => {
    const proceed = window.confirm("Warning: your current entries will be lost")
    if (proceed) {
      if (bookingGlobalState === "required") {
        setGlobalState('personal')
      }
      else if (bookingGlobalState === "payment")
        setGlobalState("required")
    }
  }

  return (
    <>
      <div className="my-2 bookingNavCls bg-dark text-light">
          {(bookingGlobalState === "required" || bookingGlobalState === "payment") && <div className="goBackCls" onClick={goBack}><ArrowCircleLeftIcon fontSize= "large"/></div>}
          <h1 className="bookingTextCls">Program Booking</h1>
      </div>

      <div className="my-2">
        <div className="bg-light p-2 text-center">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
    </>

  );
}

export default Progresser;