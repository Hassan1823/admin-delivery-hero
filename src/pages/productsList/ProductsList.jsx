import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { backendLink } from "../../lib/data";
import { toast } from "react-toastify";

const ProductsList = ({ columns }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`${backendLink}/api/product/allProducts`);
      if (!response.ok) {
        toast.error("Something Went Wrong");
      } else {
        const products = await response.json();
        setUserData(products.data || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userData || userData.length === 0) {
      getAllUsers();
    }
  }, [userData]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await fetch(
          `${backendLink}/api/product/searchAllProducts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: searchValue,
            }),
          }
        );

        if (!response.ok) {
          // toast.error("Something went wrong");
          getAllUsers();
        } else {
          const res = await response.json();
          console.log(res);
          setUserData(res.products);
        }
      } catch (error) {
        console.Console.log(error);
      }
    };
    if (searchValue && searchValue !== "") {
      searchProducts();
    }
  }, [searchValue]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar setSearchValue={setSearchValue} />
        <Datatable
          columns={columns}
          userData={userData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProductsList;
