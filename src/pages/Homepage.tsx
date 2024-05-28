import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import OrderListTable from "../components/order/OrderListTable";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useSelector(({ userReducer }) => userReducer);

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center w-full">
      <main className="container flex flex-col w-full py-12">
        {
          user && (
            <div className="flex justify-between w-full px-4 pb-6">
              <TextField
                variant="outlined"
                className="w-80"
                placeholder="Search items..."
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                variant="contained"
                className="px-4 py-3 bg-primary font-bold"
                onClick={() => navigate("/order/new")}
              >
                <AddIcon />
                <p className="ml-2">new order</p>
              </Button>
            </div>
          )
        }

        <OrderListTable search={search} />
      </main>
    </div>
  );
}
