import notFoundImage from 'assets/404-error-page-not-found-with-people-connecting-a-plug-pana-2861.webp';
import './styles.scss';

export const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={notFoundImage} alt="not found" />
    </div>
  );
};
