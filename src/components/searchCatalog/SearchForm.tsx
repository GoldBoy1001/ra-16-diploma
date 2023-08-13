import { useDebounce } from "../../hook/debounce";
import { useState, useEffect } from "react";
import "./styleSearch.css";
import { useLazyProductsQuery } from "../../store/bosaNoga/bosaNoga.api";
import { useActions } from "../../hook/useActions";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  searchCategory,
}: {
  searchCategory: string;
}) {
  const { pathname } = useLocation();
  const [fetchSearchCaregory, { data, isError }] = useLazyProductsQuery();
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { addItemSearch } = useActions();
  const text = useTypedSelector((state) => state.formText.addText);
  const catalog = useTypedSelector((state) => state.catalog);
  const { addText } = useActions();
  console.log(catalog);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounced.trim().length < 2) {
      return;
    }
    fetchSearchCaregory(`?categoryId=${searchCategory}&q=${debounced}`);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    addItemSearch(data || []);
  }, [data]);

  useEffect(() => {
    setSearch(text);
  }, [text]);

  useEffect(() => {
    if (
      searchCategory === "" ||
      (debounced.trim().length > 2 && searchCategory)
    ) {
      fetchSearchCaregory(`?categoryId=${searchCategory}&q=${debounced}`);
    }
  }, [searchCategory, fetchSearchCaregory]);

  useEffect(() => {
    if (text.trim().length > 0) {
      fetchSearchCaregory(`?categoryId=${searchCategory}&q=${text}`);
    }
  }, [text]);
  useEffect(() => {
    if (pathname != "/catalog") {
      addText("");
    }
  }, [pathname]);

  return (
    <>
      {catalog.length === 0 && (
        <p> В данной категории нет товара с таким названием</p>
      )}
      {!isError && (
        <form
          onSubmit={submitHandler}
          className="catalog-search-form form-inline"
        >
          <input
            type="text"
            value={search}
            onChange={changeHandler}
            className="form-control"
            placeholder="Поиск"
          />
        </form>
      )}
    </>
  );
}
