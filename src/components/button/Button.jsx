import PropTypes from "prop-types";

function Button({ children, onClick, className, disabled }) {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired, // Kan vara text, element, etc.
    onClick: PropTypes.func, // En funktion
    className: PropTypes.string, // En sträng
    disabled: PropTypes.bool, // En boolean
};

export default Button;