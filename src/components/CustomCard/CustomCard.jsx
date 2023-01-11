import Card from 'react-bootstrap/Card';
import './styles.scss';

/**
 * Component to wrap content
 * @prop title: <string>
 * @prop children: <jsx> content
 * @prop width: <number>, width of card represented in pixels
 */
export const CustomCard = ({ title, children, width = 600, icon = '' }) => {
  return (
    <Card style={{ width }} className="customcard-container">
      {icon && (
        <div className="customcard-container__icon">
          <img src={icon} alt="icon" />
        </div>
      )}
      <Card.Body>
        <Card.Title className="customcard-container__title">{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};
