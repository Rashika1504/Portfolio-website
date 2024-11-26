import "./mode.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { themeActions } from "../store/theme";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DoneIcon from "@mui/icons-material/Done";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const icons = [<LightModeIcon />, <DarkModeIcon />, <ContrastIcon />];

const Mode = () => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [iconIndex, setIcon] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0
    );

    const handleModeChange = (index) => {
        const mode = index === 0 ? "light" : index === 1 ? "dark" : "auto";
        setIcon(index);
        dispatch(themeActions.setMode(mode));
        setIsVisible(false);
    };

    const handleDropdown = () => setIsVisible((prev) => !prev);

    return (
        <div className="theme">
            <ul className={`dropdown ${isVisible ? "visible" : ""}`}>
                {["Light", "Dark", "Auto"].map((mode, index) => (
                    <li
                        key={index}
                        className={`modeItem ${iconIndex === index ? "activeMode" : ""}`}
                        onClick={() => handleModeChange(index)}
                    >
                        {icons[index]}
                        {mode}
                        <DoneIcon style={{ color: iconIndex === index ? "inherit" : "transparent" }} />
                    </li>
                ))}
            </ul>
            <div className="modeBtn">
                <button onClick={handleDropdown}>
                    {icons[iconIndex]}
                    <ArrowDropUpIcon />
                </button>
            </div>
        </div>
    );
};

export default Mode;
