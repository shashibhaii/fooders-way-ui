import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AlertSucess({ message, isToastSuccess, setToastSuccess, setAllertmsg }) {
  useEffect(() => {
    if (message !== '' && isToastSuccess) {
      toast.success(message, {
        position: "top-center",
        autoClose: 700
      });
      setAllertmsg('');
      setToastSuccess(false);
    }
  }, [isToastSuccess])

  return (
    <>
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default AlertSucess
