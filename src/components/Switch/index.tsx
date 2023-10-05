import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { themeState } from "../../recoil/Theme";
import { HiOutlineMoon } from "react-icons/hi";
import { FiSun } from "react-icons/fi";

function ThemeSwitch() {
  const [theme, setTheme] = useRecoilState(themeState);
  const isDarkMode = theme === "dark";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <SwitchButton $isDarkMode={isDarkMode} onClick={handleToggle}>
      {isDarkMode ? <HiOutlineMoon /> : <FiSun />}
    </SwitchButton>
  );
}

const SwitchButton = styled.button<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? "#25262c" : "#ffffff"};
  font-size: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border3};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text2};
  transition: all 0.3s ease-out 0s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary1};
    box-shadow: ${({ theme }) => theme.colors.alpha_violet1} 0px 0px 0px 3px;
    background-color: ${({ $isDarkMode }) =>
      $isDarkMode ? "#41424b" : "#151515"};
    color: #ffffff;
  }

  &:focus {
    outline: none;
  }
`;

export default ThemeSwitch;
