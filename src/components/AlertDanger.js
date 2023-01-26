import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AlertDanger({ message, isToastDanger, setToastDanger, setAllertmsg }) {
  useEffect(() => {
    if (message !== '' && isToastDanger) {
      toast.error(message, {
        position: "top-center",
        autoClose: 700
      });
      setToastDanger(false);
      setAllertmsg('');
    }
  }, [isToastDanger])

  return (
    <>
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default AlertDanger
