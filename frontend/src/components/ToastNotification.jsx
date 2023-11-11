import React, { useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { showHideNotification } from '../features/notificationSlice';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.notifications.value);

  useEffect(() => {
    if (show) {
      notify();
      dispatch(showHideNotification(false));
    }
  }, [show, dispatch]);

  const notify = () =>
    toast.success('Added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  return (
    <div>
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default ToastNotification;
