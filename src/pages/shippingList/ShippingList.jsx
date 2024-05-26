import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { backendLink } from "../../lib/data";
import { toast } from "react-toastify";

const ShippingList = ({ columns }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true);
        // const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `${backendLink}/api/shipping/view-adminShippings`
        );
        if (!response.ok) {
          toast.error("Something Went Wrong");
        } else {
          const shippings = await response.json();
          console.log(shippings);
          setUserData(shippings?.data || []);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    if (!userData || userData.length === 0) {
      getAllUsers();
    }
  }, [userData]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          columns={columns}
          userData={userData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ShippingList;
