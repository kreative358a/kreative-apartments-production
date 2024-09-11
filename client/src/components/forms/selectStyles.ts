// https://react-select.com/advanced
const customStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		fontWeight: "--select-option-font-wight",
		backgroundColor: "var(--select-background-color)",
		borderColor: "var(--select-border-color)",
		borderWidth: "var(--select-border-width)",
		color: "var(--select-text-color)",
		"&:hover": {
			backgroundColor:"var(--select-hover-background-color)",
			borderColor: "var(--select-border-hover-color)",
		},
		"&:focus": {
			backgroundColor:"var(--select-focus-background-color)",
			borderColor: "var(--select-border-focus-color)",
		},
	}),

	option: (provided: any, state: any) => ({
		...provided,	
		marginTop: "2px",
		marginBottom: "2px",
		borderColor: "var(--select-border-color)",
		borderWidth: "var(--select-border-width)",		
		backgroundColor: state.isSelected
			? "var(--select-option-selected-background-color)"
			: "var(--select-option-background-color)",
		color: "var(--select-option-selected-text-color)",
		"&:hover": {
			backgroundColor: "var(--select-option-hover-background-color)",
			color: "var(--select-option-hover-text-color)",
		},
	}),

	 singleValue: (provided: any) => ({
		...provided,
		color: "var(--select-value-text-color)",
	}),  
	menu: (provided: any) => ({
		...provided,
		// backgroundColor: "var(--select-menu-background-color)",
		// backgroundColor: "var(--select-menu-background-color-transparent)",
		backgroundColor: "transparent",
		background: "rgba(120, 120, 160, 0.6)",
		"&:hover": {
			// backgroundColor: "var(--select-menu-hover-background-color)",
			// backgroundColor: "var(--select-menu-background-color-transparent)",
			backgroundColor: "transparent",
			// background: "rgba(120, 120, 160, 0.8)",
		},		
	}),

	menuList: (provided: any) => ({
		...provided,
		height: "100%",
		overflowY: "scroll",
		overflowX: "hidden",
		scrollbarWidth: "none",	
		padding: "0px 2px 0px 2px",		
		background: "var(--select-menu-background-color)",
		// backgroundColor: "var(--select-menu-background-color-transparent)",
		borderColor: "var(--select-border-color)",
		borderWidth: "2px",	
		backgroundColor: "transparent",
		"&:hover": {
			background: "var(--select-menu-hover-background-color)",
			// backgroundColor: "var(--select-menu-background-color-transparent)",
			
			backgroundColor: "transparent",
			// background: "rgba(120, 120, 160, 0.6)",
		},	
	}),	
};


export default customStyles;