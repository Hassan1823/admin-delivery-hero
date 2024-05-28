import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { backendLink } from "../../lib/data";
import { toast } from "react-toastify";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customersData, setCustomersData] = useState([]);
  const [customerPer, setCustomersPer] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [productPer, setProductsPer] = useState(0);
  const [shippingsData, setShippingsData] = useState([]);
  const [shippingPer, setShippingsPer] = useState(0);
  const [shippingToday, setShippingsToday] = useState(0);
  const [shippingTotal, setShippingsTotal] = useState(0);
  const [sixMonthData, setSixMonthData] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendLink}/api/customer/allCustomers`
        );
        if (!response.ok) {
          toast.error("Something Went Wrong");
        } else {
          const res = await response.json();
          setCustomersData(res.data || []);
          const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
          const dayBeforeYesterday = new Date(
            new Date().setDate(new Date().getDate() - 2)
          )
            .toISOString()
            .split("T")[0]; // Get the day before yesterday's date

          // Filter data for today and the day before yesterday
          const todaysData = res.data.filter(
            (user) =>
              new Date(user.createdAt).toISOString().split("T")[0] === today
          );
          const dayBeforeYesterdaysData = res.data.filter(
            (user) =>
              new Date(user.createdAt).toISOString().split("T")[0] ===
              dayBeforeYesterday
          );

          // Check if there's any data for the day before yesterday to avoid division by zero
          let totalDayBeforeYesterday = dayBeforeYesterdaysData.length;
          let totalToday = todaysData.length;
          if (totalDayBeforeYesterday === 0) {
            console.log("No data available for the day before yesterday.");
            return; // Exit the function early if there's no data for the day before yesterday
          }

          // Calculate the raw percentage change
          const rawPercentageChange =
            ((totalToday - totalDayBeforeYesterday) / totalDayBeforeYesterday) *
            100;

          // Adjust the percentage to be positive
          const adjustedPercentageChange = Math.abs(rawPercentageChange);

          setCustomersPer(adjustedPercentageChange.toFixed(0));
          console.log(
            `Adjusted Percentage of new data added today: ${adjustedPercentageChange.toFixed(
              0
            )}%`
          );
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${backendLink}/api/product/allProducts`);
        if (!response.ok) {
          toast.error("Something Went Wrong");
        } else {
          const res = await response.json();
          setProductsData(res.data || []);
          const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
          const dayBeforeYesterday = new Date(
            new Date().setDate(new Date().getDate() - 2)
          )
            .toISOString()
            .split("T")[0]; // Get the day before yesterday's date

          // Filter data for today and the day before yesterday
          const todaysData = res.data.filter(
            (product) =>
              new Date(product.createdAt).toISOString().split("T")[0] === today
          );
          const dayBeforeYesterdaysData = res.data.filter(
            (product) =>
              new Date(product.createdAt).toISOString().split("T")[0] ===
              dayBeforeYesterday
          );

          // Check if there's any data for the day before yesterday to avoid division by zero
          let totalDayBeforeYesterday = dayBeforeYesterdaysData.length;
          let totalToday = todaysData.length;
          if (totalDayBeforeYesterday === 0) {
            console.log("No data available for the day before yesterday.");
            return; // Exit the function early if there's no data for the day before yesterday
          }

          // Calculate the raw percentage change
          const rawPercentageChange =
            ((totalToday - totalDayBeforeYesterday) / totalDayBeforeYesterday) *
            100;

          // Adjust the percentage to be positive
          const adjustedPercentageChange = Math.abs(rawPercentageChange);

          // Log the total number of data present for today
          console.log(
            `Total number of products present for today: ${totalToday}`
          );

          // Log the adjusted percentage of new products added today
          setProductsPer(adjustedPercentageChange.toFixed(0));
          console.log(
            `Adjusted Percentage of new products added today: ${adjustedPercentageChange.toFixed(
              0
            )}%`
          );
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const getAllShipping = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendLink}/api/shipping/view-adminShippings`
        );
        if (!response.ok) {
          toast.error("Something Went Wrong");
        } else {
          const res = await response.json();
          setShippingsData(res?.data || []);
          const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
          const dayBeforeYesterday = new Date(
            new Date().setDate(new Date().getDate() - 2)
          )
            .toISOString()
            .split("T")[0]; // Get the day before yesterday's date

          // Filter data for today and the day before yesterday
          const todaysData = res.data.filter((order) => {
            const orderDate = new Date(order.createdAt)
              .toISOString()
              .split("T")[0];
            console.log(`Order Date: ${orderDate}, Today: ${today}`);
            return orderDate === today;
          });
          const dayBeforeYesterdaysData = res.data.filter(
            (order) =>
              new Date(order.createdAt).toISOString().split("T")[0] ===
              dayBeforeYesterday
          );

          // Debugging: Log the counts to verify the filtering
          console.log(
            `Todays Data Count: ${todaysData.length}, Day Before Yesterday Count: ${dayBeforeYesterdaysData.length}`
          );

          // Check if there's any data for the day before yesterday to avoid division by zero
          let totalDayBeforeYesterday = dayBeforeYesterdaysData.length;
          let totalToday = todaysData.length;
          if (totalDayBeforeYesterday === 0) {
            console.log("No data available for the day before yesterday.");
            return; // Exit the function early if there's no data for the day before yesterday
          }

          // Calculate the raw percentage change
          const rawPercentageChange =
            ((totalToday - totalDayBeforeYesterday) / totalDayBeforeYesterday) *
            100;

          // Adjust the percentage to be positive
          const adjustedPercentageChange = Math.abs(rawPercentageChange);

          // Calculate the total shipping cost for today's data
          const todaysShippingCostSum = todaysData.reduce(
            (acc, order) => acc + order.shippingCost,
            0
          );

          // Calculate the total shipping cost for all data
          const totalShippingCostSum = res.data.reduce(
            (acc, order) => acc + order.shippingCost,
            0
          );

          // Calculate the percentage of today's shipping cost relative to the overall shipping cost
          let percentageOfTodaysShippingCost = 0;
          if (totalShippingCostSum !== 0) {
            percentageOfTodaysShippingCost =
              (todaysShippingCostSum / totalShippingCostSum) * 100;
            console.log(
              `Total shipping cost for today's data: ${todaysShippingCostSum}`
            );
          }

          // Log the total shipping cost for today's data
          setShippingsToday(todaysShippingCostSum || 0);
          console.log(
            `Total shipping cost for today's data: ${todaysShippingCostSum}`
          );

          // Log the total shipping cost for all data
          setShippingsTotal(totalShippingCostSum || 0);
          console.log(`Overall total shipping cost: ${totalShippingCostSum}`);

          // Log the total number of shipping orders present for today
          console.log(
            `Total number of shipping orders present for today: ${totalToday}`
          );

          // Log the adjusted percentage of new shipping orders added today
          setShippingsPer(adjustedPercentageChange.toFixed(0));
          console.log(
            `Adjusted Percentage of new shipping orders added today: ${adjustedPercentageChange.toFixed(
              0
            )}%`
          );
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const getLastSixMonthsRevenue = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendLink}/api/shipping/view-adminShippings`
        );
        if (!response.ok) {
          toast.error("Something Went Wrong");
        } else {
          const res = await response.json();

          // Function to group data by month and sum the shippingCost
          const groupByMonthAndSum = (data) => {
            const grouped = {};
            data.forEach((item) => {
              const month = item.createdAt.split("T")[0].slice(0, 7); // Extract year-month
              if (!grouped[month]) {
                grouped[month] = { month, total: 0 };
              }
              grouped[month].total += item.shippingCost;
            });
            return Object.values(grouped);
          };

          // Group the data by month and sum the shippingCost
          const monthlyRevenue = groupByMonthAndSum(res.data);

          // Calculate the revenue for the last six months
          const now = new Date();
          const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
          const revenueLastSixMonths = monthlyRevenue
            .filter((monthly) => new Date(monthly.month) >= sixMonthsAgo)
            .map((monthly) => ({
              month: monthly.month,
              revenue: monthly.total || 0, // Use 0 if there's no revenue for the month
            }));

          // Log the revenue for the last six months
          setSixMonthData(revenueLastSixMonths);
          console.log(revenueLastSixMonths);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    if (!productsData || productsData.length === 0) {
      getAllProducts();
    }
    if (!customersData || customersData.length === 0) {
      getAllCustomers();
    }
    if (!shippingsData || shippingsData.length === 0) {
      getAllShipping();
      getLastSixMonthsRevenue();
    }
  }, [customersData, productsData, shippingsData]);

  const { data, loading } = useFetch("/customer/countcustomers");

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar setSearchValue={setSearchValue} />
        <div className="widgets">
          <Widget
            type="Customers"
            count={customersData.length || 100}
            per={customerPer || 0}
          />
          <Widget
            type="Products"
            count={productsData.length || 67}
            per={productPer || 0}
          />
          <Widget
            type="Shipment"
            count={shippingsData.length || 67}
            per={shippingPer || 0}
          />
          <Widget
            type="balance"
            count={shippingToday || shippingTotal || 0}
            per={7}
          />
        </div>
        <div className="charts">
          <Featured total={shippingTotal || 0} />
          <Chart
            // revenue={sixMonthData}
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
          />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
