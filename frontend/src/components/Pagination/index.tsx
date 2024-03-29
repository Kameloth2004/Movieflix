import ReactPaginate from "react-paginate";
import { ReactComponent as ArrowIcon } from "../../assets/images/arrowicon.svg";
import "./styles.css";

type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
}


const Pagination = ( { pageCount, range, onChange }: Props ) => {
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-item"
        breakClassName="pagination-item"
        previousLabel={<ArrowIcon />}
        nextLabel={<ArrowIcon />}
        previousClassName="arrow-previous"
        nextClassName="arrow-next"
        activeLinkClassName="pagination-active"
        disabledClassName="arrow-inactive"
        onPageChange={ (items) => (onChange) ? onChange(items.selected) : {}}
      ></ReactPaginate>

      
    </>
  );
};

export default Pagination;
