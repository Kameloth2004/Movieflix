import { ReactComponent as ArrowIcon } from '../../assets/images/arrowicon.svg';
import './styles.css';

const Pagination = () => {
  return (
    <div className="pagination-container">
      <ArrowIcon className='arrow-previous arrow-inactive' />
      <div className="pagination-item active">1</div>
      <div className="pagination-item">2</div>
      <div className="pagination-item">3</div>
      <ArrowIcon className='arrow-next arrow-active'/>
    </div>
  );
};

export default Pagination;
