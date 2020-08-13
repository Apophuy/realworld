import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ isActive, pageNumber, changePageHandler }) => {
  const onClick = (event) => {
    event.preventDefault();
    changePageHandler(pageNumber);
  };
  return (
    <li className={isActive ? 'active' : 'waves-effect'}>
      <a onClick={onClick} href={pageNumber}>
        {pageNumber}
      </a>
    </li>
  );
};
Page.defaultProps = {
  isActive: false,
  pageNumber: 1,
};

Page.propTypes = {
  isActive: PropTypes.bool,
  pageNumber: PropTypes.number,
  changePageHandler: PropTypes.func.isRequired,
};
export default Page;
