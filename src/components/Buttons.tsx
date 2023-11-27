import React from "react";
import PropTypes from "prop-types";

const Boton = ({ className, onClick, children,disabled  }: any) => {
  return (
    <button
    disabled={disabled }
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Boton.propTypes = {
  disabled : PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Boton;
