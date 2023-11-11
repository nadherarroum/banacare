// import { ToastContainer, Toast } from 'react-bootstrap';
// import { showHideNotification } from '../features/notificationSlice';
// import { useDispatch, useSelector } from 'react-redux';

// const Notification = () => {
//   const dispatch = useDispatch();
//   const show = useSelector((state) => state.notifications.value);

//   return (
//     <ToastContainer className="p-3" style={{ zIndex: '3', position: 'fixed' }}>
//       <Toast
//         onClose={() => dispatch(showHideNotification(false))}
//         show={show}
//         delay={2500}
//         autohide
//         style={{ zIndex: '3', position: 'fixed' }}
//       >
//         <Toast.Header>
//           <strong className="me-auto">Cart</strong>
//           <small></small>
//         </Toast.Header>
//         <Toast.Body className="d-flex justify-content-between">
//           <span>Item added successfully to cart!</span>
//           <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//         </Toast.Body>
//       </Toast>
//     </ToastContainer>
//   );
// };

// export default Notification;
