import { useEffect, useState } from "react";

import "./styleButton.css";
import { useLazyProductsQuery } from "../../store/bosaNoga/bosaNoga.api";
import { useActions } from "../../hook/useActions";
import Preload from "../preload/Preload";

interface ButtonProps {
  category: string;
  onMore: () => void;
}

export default function Button({ category, onMore }: ButtonProps) {
  const { addMore, addLengthCatalog } = useActions();
  const [fetchMore, { data = [], isFetching }] = useLazyProductsQuery();
  const [value, setValue] = useState(6);
  const { removeMore } = useActions();

  const fetchAddMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onMore();
    setValue(value + 6);
    removeMore(false);
    fetchMore(`?categoryId=${category}&offset=${value}`);
  };

  useEffect(() => {
    setValue(6);
  }, [category]);

  useEffect(() => {
    addMore(data || []);
    addLengthCatalog(data || []);
  }, [data]);

  return (
    <div className="text-center">
      {isFetching ? (
        <Preload />
      ) : (
        <button onClick={fetchAddMore} className="btn btn-outline-primary">
          Загрузить ещё
        </button>
      )}
    </div>
  );
}
