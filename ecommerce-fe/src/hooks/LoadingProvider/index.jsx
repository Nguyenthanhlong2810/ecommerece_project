// import Loading from 'components/Loading/Loading';
// import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';

// const LoadingContext = React.createContext({
//   loading: false,
//   showLoading: () => ({}),
//   hideLoading: () => ({})
// });

// function LoadingProvider(props) {
//   const [loading, setLoading] = useState(false);

//   const contextValue = {
//     loading: loading,
//     showLoading: () => setLoading(true),
//     hideLoading: () => setLoading(false)
//   };

//   return (
//     <LoadingContext.Provider value={contextValue}>
//       <Loading loading={loading} />
//       {props.children}
//     </LoadingContext.Provider>
//   );
// }

// LoadingProvider.propTypes = {
//   children: PropTypes.any
// };

// /**
//  * @example
//  * const {showLoading, hideLoading} = useLoading();
//  */
// const useLoading = () => useContext(LoadingContext);

// export { LoadingProvider, useLoading };
