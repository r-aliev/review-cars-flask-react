import React, { useState, useEffect } from "react";
import { Grid, Paper, Autocomplete, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { textAlign } from "@mui/system";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "brand",
    headerName: "Brand name",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 100,
  },
  {
    field: "mileage",
    headerName: "Mileage",
    type: "number",
    width: 150,
  },
  {
    field: "production_year",
    headerName: "Manufactured Year",
    width: 150,
  },
];

const Home = () => {
  const setPriceRange = () => {
    let arr = ["100"];
    for (let i = 500; i <= 100000; i += 500) arr.push(i.toString());
    return arr;
  };

  let priceRange = [...setPriceRange()];

  const setManufacturedYearRange = () => {
    let arr = [];
    const today = new Date();
    const thisYear = today.getFullYear();
    for (let i = thisYear; i >= 1996; i--) arr.push(i.toString());
    return arr;
  };

  let manufacturedYearRange = [...setManufacturedYearRange()];

  const mileageRange = [
    "5000",
    "10000",
    "20000",
    "25000",
    "50000",
    "75000",
    "100000",
    "125000",
    "150000",
    "200000",
    "250000",
  ];

  const carBrands = [
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen",
    "Toyota",
    "Lada",
    "Renault",
  ];

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterData, setFilteredData] = useState([]);
  const [brand, setBrand] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceRange[priceRange.length - 1]);
  const [minManufacturedYear, setMinManufacturedYear] = useState(0);
  const [maxManufacturedYear, setMaxManufacturedYear] = useState(
    manufacturedYearRange[0]
  );
  const [maxMileage, setMaxMileage] = useState(
    mileageRange[mileageRange.length - 1]
  );

  const handleSearch = () => {
    const newData = data
      .filter((car) => car.brand === (brand || car.brand))
      .filter((car) => car.price >= priceMin)
      .filter((car) => car.price <= priceMax)
      .filter((car) => car.production_year >= parseInt(minManufacturedYear))
      .filter((car) => car.production_year <= parseInt(maxManufacturedYear))
      .filter((car) => car.mileage <= parseFloat(maxMileage)); // burda problem var
    setFilter(true);
    setFilteredData(newData);
  };

  const handleReset = () => {
    setFilter(false);
  };

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data)
      });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid container item xs={8} columnSpacing={2} rawSpacing={1}>
        <Grid item md={4} xs={12}>
          <Autocomplete
            disablePortal
            id="brand"
            options={carBrands}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Brand" />}
            onChange={(e) => setBrand(e.target.textContent)}
          />
        </Grid>
        <Grid container item md={4} xs={12}>
          <Grid item xs={6}>
            {" "}
            <Autocomplete
              disablePortal
              id="priceMin"
              options={priceRange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Price Min" />
              )}
              onChange={(e) => setPriceMin(e.target.textContent)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="priceMax"
              options={priceRange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Price Max" />
              )}
              onChange={(e) => setPriceMax(e.target.textContent)}
            />
          </Grid>
        </Grid>
        <Grid container item md={4} xs={12}>
          <Grid item xs={6}>
            {" "}
            <Autocomplete
              disablePortal
              id="manufactureYearFrom"
              options={manufacturedYearRange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Min Manufactured Year" />
              )}
              onChange={(e) => setMinManufacturedYear(e.target.textContent)}
            />
          </Grid>
          {/* TODO: Add label above  or make smaller the inner text*/}
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="manufactureYearTill"
              options={manufacturedYearRange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Max Manufactured Year" />
              )}
              onChange={(e) => setMaxManufacturedYear(e.target.textContent)}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Grid item md={4} xs={12}>
            <Autocomplete
              disablePortal
              id="mileageMax"
              options={mileageRange}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Max Mileage" />
              )}
              onChange={(e) => setMaxMileage(e.target.textContent)}
            />
          </Grid>
        </Grid>
        <Grid container item md={12} xs={12} justifyContent="center">
          <Grid item md={2} xs={6}>
            <Button variant="contained" size="large" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
          <Grid item md={2} xs={6}>
            <Button variant="contained" size="large" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={10} sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={filter ? filterData : data}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPageOptions={[2]}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
