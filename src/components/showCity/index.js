import React, { useEffect } from "react";
import { Box } from "@mui/system";

import {
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { box1, box2 } from "../../styles.js";
import { CustomTablePagination } from "./customPagination.js";

import Modals from "./modal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../../graphql/queries";
import { DELETE_QUERY } from "../../graphql/mutations.js";
import { boxst, button2, paper1, table1, table2, table3 } from "./styles.js";

const ShowCity = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const user = localStorage.getItem("userId");

  const { data, loading, error, refetch } = useQuery(GET_ALL_CITIES, {
    variables: {
      userID: user,
    },
  });
  useEffect(() => {
    refetch();
  }, [data]);

  const [deleteCities] = useMutation(DELETE_QUERY);

  if (loading) return <CircularProgress />;

  if (error) {
    console.log({ error });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    refetch();
  };
  const deleteCurrentCity = (event, city) => {
    deleteCities({
      variables: {
        cityId: city._id,
      },
    })
      .then((deleteData) => {
        console.log(deleteData);
        console.log(city._id);
        data.cities.filter((c) => c._id !== city._id);
        refetch();
      })
      .catch(({ deleteError }) => {
        console.log({ deleteError });
      });
  };

  return (
    <Box sx={box1}>
      <Box sx={box2}>
        <Stack
          sx={{
            display: {
              xs: "flex",
            },
            mb: 1,
          }}
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <Button
            sx={button2}
            component={Link}
            to="/SeeWeather"
            variant="outlined"
          >
            Show Weather
          </Button>
        </Stack>
        <Modals />
        <Paper elevation={20} sx={{ padding: "20px", mt: "30px" }}>
          <Box sx={boxst}>
            {data.cities.length > 0 ? (
              <Paper sx={paper1} variant="outlined">
                <Stack direction="row" alignItems="center">
                  <Typography
                    sx={{ fontWeight: 600, color: "#0d6efd" }}
                    flex={3}
                  >
                    City Name
                  </Typography>

                  <Typography
                    sx={{ fontWeight: 600, color: "#0d6efd" }}
                    flex={1}
                  >
                    Action
                  </Typography>
                </Stack>
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ padding: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#0d6efd",
                    textAlign: "center",
                  }}
                >
                  No Cities Found
                </Typography>
              </Paper>
            )}
            {data.cities.length > 0 && (
              <TableContainer sx={{ boxBorder: 2 }}>
                <Table
                  sx={{ minWidth: 500, fontSize: "10px" }}
                  aria-label="simple table"
                >
                  <TableBody>
                    {data.cities
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((city, index) => (
                        <TableRow
                          key={index}
                          className="bg-gray-100"
                          variant="outlined"
                          sx={{
                            border: 0,
                            padding: "7px",
                          }}
                        >
                          <TableCell sx={table1}>{city.label}</TableCell>

                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              sx={table2}
                              onClick={(event) =>
                                deleteCurrentCity(event, city)
                              }
                            >
                              Delete
                            </Button>

                            <DeleteIcon
                              variant="contained"
                              color="primary"
                              fontSize="large"
                              sx={table3}
                              onClick={(event) =>
                                deleteCurrentCity(event, city)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
          <CustomTablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={data.cities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            componentsProps={{
              select: {
                "aria-label": "rows per page",
              },
              actions: {
                showFirstButton: true,
                showLastButton: true,
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* <CustomTablePagination
              flex-direction="column"
              sx={{}}
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={data.cities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
        </Paper>
        <Stack
          sx={{
            padding: "4px",
            mt: 2,
            display: {
              xs: "none",
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "flex",
            },
          }}
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <Button
            sx={button2}
            component={Link}
            to="/SeeWeather"
            variant="outlined"
          >
            Show Weather
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ShowCity;
