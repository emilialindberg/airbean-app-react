import PropTypes from "prop-types";

function Button({ children, className, onClick, disabled }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
        {children}
    </button>
  );
}

Button.protoTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
export default Button;