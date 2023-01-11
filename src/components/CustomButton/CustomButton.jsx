import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './styles.scss';

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
