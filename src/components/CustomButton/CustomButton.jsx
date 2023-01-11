import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './styles.scss';

/**
 * Main component button
 * @prop title:<string> button title
 * @prop onClick:<function> click event function
 * @prop disabled:<boolean> disable the button
 * @prop loading:<boolean> flag to activate the spinner
 */
export const CustomButton = ({
  title = '',
  onClick = () => {},
  disabled = true,
  loading = true
}) => {
  return (
    <Button
      variant="primary"
      type="submit"
      onClick={onClick}
      className="button"
      disabled={disabled}>
      {loading && (
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
      )}
      <span>{title}</span>
    </Button>
  );
};
