import PropTypes from "prop-types";

export default PropTypes.shape({
  username: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  theme: PropTypes.string,
  font: PropTypes.string,
  codeStyle: PropTypes.string
});
