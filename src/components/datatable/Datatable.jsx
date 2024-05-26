import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { backendLink } from "../../lib/data";
import { toast } from "react-toastify";

const Datatable = ({ columns, userData, isLoading, refetch, setIsLoading }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  const [list, setList] = useState();
  // const { data, loading, error } = useFetch(`/${path}`);
  // console.log(data);
  useEffect(() => {
    setList(userData);
  }, [userData]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendLink}/api/auth/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Something Went Wrong");
      } else {
        const res = await response.json();
        refetch();
        toast.success(res.message);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        // console.log(params);
        return (
          <div className="cellAction">
            {/* user id will pass here to new page  */}
            <Link
              to={`/users/${params?.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {isLoading ? (
        <>Please Wait ...</>
      ) : (
        <div className="datatable">
          <div className="datatableTitle">
            {path}
            <Link to={`/${path}/new`} className="link">
              Add New
            </Link>
          </div>
          {list ? (
            <DataGrid
              className="datagrid"
              rows={list}
              columns={columns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          ) : (
            <div class="loader"></div>
          )}
        </div>
      )}
    </>
  );
};

export default Datatable;
