import { DefaultTheme } from "styled-components";

const colors = {
  primary: "rgb(240, 238, 255)",
  secondary: "rgb(27, 206, 107)",
  activeColor: "rgb(109, 85, 255)",
  hoverColor: "rgba(109, 85, 255, 0.4)",
  inputColor: "rgb(245, 245, 247)",
  bgColor: "#f4f6f9",
  white: "#ffffff",
  black: "#000000",
  tagText: "rgb(142, 142, 142)",
  border: "rgba(0, 0, 0, 0.05)",
};

const fontSize = {
  title: 20,
  subTitle: 16,
  text: 12,
};

const sizes = {
  sm: "380px",
  md: "560px",
  lg: "1140px",
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type sizesTypes = typeof sizes;

const theme: DefaultTheme = {
  colors,
  fontSize,
  sizes,
};

export default theme;
