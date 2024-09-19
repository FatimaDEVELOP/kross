import React, { useEffect, useState } from "react";
import kross from "../img/kross.png";
import {
  AppBar,
  Badge,
  Box,
  Button,
  CardContent,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getBasket, removeBasket } from "../../store/Reducer/krossSlice";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { basket } = useSelector((state) => state.shop);

  const arr = basket
    .map((el) => el.price)
    .map((value) => parseFloat(value.replace("$", "")));
  const price = arr.reduce((acc, curr) => acc + curr, 0).toFixed(3);
  const dispatch = useDispatch();

  function removeFromBasket(itemId) {
    return dispatch(removeBasket(itemId));
  }
  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);
  console.log(basket);

  return (
    <div>
      <AppBar sx={{ background: "#fff", padding: "15px" }}>
        <Toolbar>
          <img
            src={kross}
            alt=""
            style={{ width: "50px", height: "50px", marginTop: "10px" }}
          />

          <Box mt={2} ml={2}>
            <Typography
              sx={{ fontSize: "32px", fontWeight: "700", color: "#000000" }}
            >
              Kross Store
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#9D9D9D" }}>
              Магазин лучших кроссовок
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "40px", marginLeft: "auto" }}>
            <Box display="flex" alignItems="center">
              <Button onClick={handleOpen}>
                <Badge
                  badgeContent={basket.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 9,
                      height: 17,
                      minWidth: 17,
                    },
                  }}
                  color="error"
                >
                  <ShoppingCartCheckoutIcon
                    sx={{
                      color: "#5C5C5C",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                </Badge>
                <Typography
                  sx={{
                    color: "#5C5C5C",
                    marginLeft: "10px",
                    fontSize: "14px",
                  }}
                >
                  ${price}
                </Typography>
              </Button>
            </Box>
            <Box display="flex" alignItems="center">
              <Badge
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 9,
                    height: 17,
                    minWidth: 17,
                  },
                }}
              >
                <FavoriteBorderIcon
                  sx={{ color: "#5C5C5C", width: "25px", height: "25px" }}
                />
              </Badge>
              <Typography
                sx={{
                  color: "#5C5C5C",
                  marginLeft: "10px",
                  fontSize: "14px",
                }}
              >
                Закладки
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <AccountCircleIcon
                sx={{ color: "#5C5C5C", width: "25px", height: "25px" }}
              />
              <Typography
                sx={{
                  color: "#5C5C5C",
                  marginLeft: "10px",
                  fontSize: "14px",
                }}
              >
                Профиль
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Box
          sx={{
            background: "rgb(255, 255, 255)",
            width: "345px",
            padding: "30px 25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
            Корзина
          </Typography>
          {basket.length !== 0 ? (
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Box
                className="scroll"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                  overflow: "hidden",
                  overflowY: "scroll",
                  height: "80%",
                }}
              >
                {basket.map((el) => (
                  <Box>
                    <React.Fragment>
                      <CardContent
                        sx={{
                          border: "1px solid rgb(243, 243, 243)",
                          borderRadius: "20px",
                          padding: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "21px",
                          }}
                        >
                          <img
                            src={el.image}
                            alt=""
                            style={{
                              width: "70px",
                              height: "70px",
                            }}
                          />
                          <Box>
                            <Typography
                              sx={{
                                color: "#000",
                                fontSize: "14px",
                                fontWeight: "400",
                                width: "150px",
                                lineHeight: "17px",
                              }}
                            >
                              {el.name}
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
                        </Box>
                        <Button
                          sx={{
                            maxWidth: "32px",
                            maxHeight: "32px",
                            minWidth: "32px",
                            minHeight: "32px",
                            border: "1.5px solid #F2F2F2",
                            borderRadius: "8px",
                            marginTop: "auto",
                          }}
                          onClick={() => removeFromBasket(el.id)}
                        >
                          <CloseIcon sx={{ color: "#D3D3D3" }} />
                        </Button>
                      </CardContent>
                    </React.Fragment>
                  </Box>
                ))}
              </Box>
              <Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      width: "325px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    Итого: ..........................................{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      dsfb
                    </span>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      width: "325px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    Налог 5%: ...................................{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      fgngf
                    </span>
                  </Typography>
                  <Button
                    sx={{
                      background: "rgb(157, 212, 88)",
                      color: "#ffff",
                      display: "flex",
                      alignItems: "center",
                      padding: "17px",
                      borderRadius: "18px",
                      gap: "20px",
                      width: "325px",
                      marginTop: "20px",
                    }}
                  >
                    Оформить заказ <ArrowForwardIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: "130px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img alt="" style={{ width: "120px", height: "120px" }} />
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                Корзина пустая
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#000",
                  textAlign: "center",
                  margin: "9px 0 40px 0",
                }}
              >
                Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
              </Typography>
              <Button
                sx={{
                  background: "rgb(157, 212, 88)",
                  color: "#ffff",
                  display: "flex",
                  alignItems: "center",
                  padding: "17px",
                  borderRadius: "18px",
                  gap: "20px",
                }}
                onClick={handleClose}
              >
                <ArrowBackIcon /> Вернуться назад
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
