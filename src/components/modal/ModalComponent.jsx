// import React, { useContext } from 'react';
// import styles from './ModalComponent.module.css';
// // import { ModalContext } from '@/providers/ModalProvider';
// import { objectValueSetter } from '@/helper/helperFunc/objectValueSetter';
// import { useRouter } from 'next/router';

// // import { clearError } from "../../feature/user/userSlice"
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //     showAction, hideAction
// // } from '../../feature/modal/modalSlice';


// function ModalComponent(props) {

//     const router = useRouter();

//     // const [ modal, setModal ] = useContext(ModalContext)

//     const close = (e) => {

//         router.replace("/")
//         // const tmp = objectValueSetter(modal, false);
//         // setModal({ ...tmp })

//         // 
//     }
//     return (
//         <>
//             {/* {
//                 Object.values(modal).some(val => val === true) &&
//                  */}

//             <div
//                 onClick={close}
//                 className={`${styles.outer} `}>
//                 {/* <h1 style={{ backgroundColor: ui.modalColor }} className={`${styles.inner} `}>
                        
//                     </h1> */}

//                 <div onClick={(e) => {
//                     e.stopPropagation()

//                 }}


//                     className={`${styles.inner} `}>
//                     <svg
//                         onClick={close}
//                         viewBox="0 0 24 24" aria-hidden="true" className={styles.cross}><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
//                     {props.children}
//                 </div>
//             </div>
//             {/* } */}
//         </>
//     );
// }

// export default ModalComponent;