// import { LOCAL_STORE, RESPONSE_STATUS } from 'consts/system.const';
// import React, { useCallback, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';

// const ErrorContext = React.createContext({
//   addError: () => ({})
// });

// /**
//  * Hook handle error globally
//  * @example
//  * const {addError} = useError();
//  * addError({ message: 'abc', status: RESPONSE_STATUS.NOT_FOUND }, 'This is error');
//  */
// function useError() {
//   const { addError } = useContext(ErrorContext);
//   return { addError };
// }

// function ErrorProvider(props) {
//   const navigate = useNavigate();

//   const addError = async (error, message) => {
//     if (error && error.status) {
//       if (error.status === RESPONSE_STATUS.FORBIDDEN) {
//         localStorage.removeItem(LOCAL_STORE.TOKEN);
//         navigate('/login', { replace: true });
//       } else {
//         toast.error(error?.message ?? message ?? 'Something went wrong!');
//       }
//     }
//   };

//   const contextValue = {
//     addError: useCallback((err, message) => addError(err, message), [])
//   };

//   return <ErrorContext.Provider value={contextValue}>{props.children}</ErrorContext.Provider>;
// }

// ErrorProvider.propTypes = {
//   children: PropTypes.any
// };

// export { useError, ErrorProvider };
