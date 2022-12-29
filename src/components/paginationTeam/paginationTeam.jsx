import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export function PaginationTeam({ metaData }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let number = 1; number <= (metaData.total_pages ?? 1); number++) {
      arr.push(
        <Pagination.Item key={number} active={number === (metaData.current_page ?? 1)}>
          {number}
        </Pagination.Item>
      );
    }
    setItems(arr);
  }, [metaData]);

  return <Pagination>{items}</Pagination>;
}
