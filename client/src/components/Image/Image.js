import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  imgWrapper: ({ StyleImgWrapper, hoverColor, pointerOnHover }) => ({
    padding: 2,
    background: "#f1f1f1",
    margin: "0",
    position: "relative",
    cursor: pointerOnHover ? "pointer" : "default",
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: hoverColor,
      opacity: 0,
      transition: "opacity .4s ease-in-out"
    },
    "&:hover": {
      "&::after": {
        opacity: 0.4
      }
    },
    ...StyleImgWrapper
  }),
  img: ({ StyleImg }) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    ...StyleImg
  })
});

//Example For A Use

/*
  <Image
                src={image}
                StyleImgWrapper={{ width: 350, height: 196, padding: 4 }}
                hoverColor="rgba(0, 0, 0, 0.777)"
                pointerOnHover
              />
 */

const Image = ({
  src,
  alt = "",
  StyleImgWrapper = {
    width: "100%",
    height: "auto",
    maxWidth: "none",
    maxHeight: "none"
  },
  StyleImg = {},
  hoverColor = "transparent",
  pointerOnHover = false
}) => {
  const classes = useStyles({
    StyleImgWrapper,
    StyleImg,
    hoverColor,
    pointerOnHover
  });

  return (
    <div className={classes.imgWrapper}>
      <img src={src} alt={alt} className={classes.img} />
    </div>
  );
};

export default Image;
