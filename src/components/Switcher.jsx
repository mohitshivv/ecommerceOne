// Filename - Components/Switcher.js

import { useContext, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { themeContext } from "../context/ThemeContext";

export default function Switcher() {

	const { toggleTheme, darkMode } = useContext(themeContext);

	return (
		<div>
			<DarkModeSwitch
				// style={{  display:"flex", alignItems:"center", border:"2px"}}
				checked={!darkMode}
				size={30}
				onClick={toggleTheme}
			/>
		</div>
	);
}
