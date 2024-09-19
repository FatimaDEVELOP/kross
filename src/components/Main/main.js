import {
  Box,
  Button,
  CardContent,
  Container,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addBasket, getShop } from "../../store/Reducer/krossSlice";

const SearchIconWrapper = styled(Box)({
  padding: "8px",
  display: "flex",
  alignItems: "center",
  marginLeft: "50px",
  position: "absolute",
  bottom: "2px",
  right: "190px",
  zIndex: "99",
});

const StyledInputBase = styled(InputBase)({
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "3px",
  border: "1px solid #ccc",
  "&:hover": {
    borderColor: "#888",
  },
  "& input": {
    padding: "8px",
  },
});

const Main = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { data } = useSelector((state) => state.shop);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    dispatch(getShop());
  }, [dispatch]);

  const filter = data.filter((el) => {
    return el?.name?.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <div>
      <Container>
        <Box
          sx={{
            width: "1080px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "200px 0 0 0",
              width: "1080px",
            }}
          >
            <Typography
              sx={{ color: "#000", fontSize: "32px", fontWeight: "700" }}
            >
              Все кроссовки{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <SearchIconWrapper sx={{ opacity: searchText ? 0 : 1 }}>
                <SearchIcon sx={{ color: "#E4E4E4" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="     search..."
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  flexWrap: "wrap",
                }}
              >
                {filter.map((el) => (
                  <React.Fragment>
                    <CardContent
                      sx={{
                        border: "1.5px solid #F3F3F3",
                        borderRadius: "40px",
                        padding: "25px 25px 35px 30px",
                        width: "190px",
                        height: "270px",
                        marginTop: "60px",
                      }}
                    >
                      <img
                        src={el.image}
                        alt=""
                        style={{ width: "185px", height: "172px" }}
                      />

                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "14px",
                          fontWeight: "400",
                          margin: "14px 0",
                          width: "150px",
                        }}
                      >
                        {el.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "rgb(189, 189, 189)",
                              fontSize: "11px",
                              fontWeight: "500",
                            }}
                          >
                            Цена:
                          </Typography>
                          <Typography
                            sx={{
                              color: "#000",
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            {el.price}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => dispatch(addBasket(el))}
                          sx={{
                            maxWidth: "32px",
                            maxHeight: "32px",
                            minWidth: "32px",
                            minHeight: "32px",
                            border: "1.5px solid #F2F2F2",
                            borderRadius: "8px",
                          }}
                        >
                          <AddIcon on sx={{ color: "#D3D3D3" }} />
                        </Button>
                      </Box>
                    </CardContent>
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Main;
