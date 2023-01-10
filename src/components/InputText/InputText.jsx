import Form from 'react-bootstrap/Form';
import './styles.scss';

/**
 * Component to create different entries with the same structure just by changing the type
 * type: string < text | password | email >
 * onChange: function to manage the value
 * placeholder: string
 * label: string
 * value: dynamic string
 * errorMessage: error string
 */
export const InputText = ({
  type = 'text',
  onChange = () => {},
  placeholder = '',
  label = '',
  value = '',
  errorMessage = ''
}) => {
  return (
    <Form.Group className="mb-3 input-container">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} onChange={onChange} value={value} />
      {errorMessage && <Form.Text className="input-container__error">{errorMessage}</Form.Text>}
    </Form.Group>
  );
};
