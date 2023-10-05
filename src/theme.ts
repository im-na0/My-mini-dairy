import { DefaultTheme } from "styled-components";

const commonStyle = {
  fontSize: {
    title: 20,
    subTitle: 16,
    text: 12,
  },
  sizes: {
    sm: "380px",
    md: "560px",
    lg: "1140px",
  },
  colors: {
    white: "#ffffff",
    black: "#000000",
    alpha_violet1: "rgba(109, 85, 255, 0.3)",
    alpha_violet2: "rgba(191, 182, 255, 0.2)",
  },
};

export const lightTheme: DefaultTheme = {
  ...commonStyle,
  colors: {
    ...commonStyle.colors,
    primary1: "#6c55ff",
    primary2: "#5944ff",
    bg_page1: "#f4f6f9",
    bg_page2: "#FFFFFF",
    bg_element1: "#DEE2E6",
    bg_element2: "#E9ECEF",
    bg_element3: "#F8F9FA",
    bg_element4: "#FFFFFF",
    text1: "#000000",
    text2: "#212529",
    text3: "#495057",
    text4: "#868E96",
    text5: "#CED4DA",
    text6: "#ffffff",
    border1: "#343A40",
    border2: "#ADB5BD",
    border3: "#DEE2E6",
    border4: "#F1F3F5",
    alpha1: "rgba(0, 0, 0, 0.5)",
    alpha2: "rgba(0, 0, 0, 0.1)",
    alpha3: "rgba(0, 0, 0, 0.05)",
  },
};

export const darkTheme: DefaultTheme = {
  ...commonStyle,
  colors: {
    ...commonStyle.colors,
    primary1: "#8e7dff",
    primary2: "#7361ff",
    bg_page1: "#0b0a0d",
    bg_page2: "#121212",
    bg_element1: "#9898a1",
    bg_element2: "#83838d",
    bg_element3: "#41424b",
    bg_element4: "#25262c",
    text1: "#ECECEC",
    text2: "#D9D9D9",
    text3: "#ACACAC",
    text4: "#595959",
    text6: "#212529",
    border1: "#E0E0E0",
    border2: "#A0A0A0",
    border3: "#4D4D4D",
    border4: "#2A2A2A",
    alpha1: "rgba(0, 0, 0, 0.5)",
    alpha2: "rgba(255, 255, 255, 0.1)",
    alpha3: "rgba(255, 255, 255, 0.05)",
  },
};
