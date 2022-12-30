import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export function PaginationTeam({ metaData, setCurrentPage }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let number = 0; number < metaData.total_pages; number++) {
      arr.push(
        <Pagination.Item key={number} active={number === metaData.current_page} onClick={()=>{
          setCurrentPage(number)
        }}>
          {number + 1}
        </Pagination.Item>
      );
    }
    setItems(arr);
  }, [metaData, setCurrentPage]);

  return <Pagination>{items}</Pagination>;
}
