import { axiosInstance } from "../../network/interceptor";
import { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import ProductCard from "../productcard/ProductCard";
import image from "../../assets/sorry-item-not-found.png";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = async (searchQuery = "") => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`search?q=${searchQuery}`);
      setProductList(res?.data?.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    callApi(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddToShortList = (productName) => {
    alert(` ${productName} added to ShortList`);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <i className="fa-solid fa-search"></i>
            Search
          </button>
        </form>
      </div>

      {
        <div className={styles.container}>
          {productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToShortList={handleAddToShortList}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <img
                src={image}
                alt="No products found"
                className={styles.notFoundImage}
              />
              <h3>No products found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>
      }
    </>
  );
}

export default ProductList;
