import Select, {
	components,
	ControlProps,
	DropdownIndicatorProps,
	ClearIndicatorProps,
	MultiValueRemoveProps,
	ValueContainerProps,
	PlaceholderProps,
	IndicatorsContainerProps,
	IndicatorSeparatorProps,
	Props,
  } from "react-select";
  import { ChevronDown, X, CircleX } from "lucide-react";
  import { type ClassValue, clsx } from "clsx";
import React from "react";
import classNames from "classnames";

const ClearIndicator: React.FC<ClearIndicatorProps> = (props) => {
	return (
	  <components.ClearIndicator {...props}>
		<X className="mx-2 size-5 fill-transparent stroke-blue-900/80 hover:stroke-blue-900 dark:stroke-blue-50/80 dark:hover:stroke-blue-50"/>
	  </components.ClearIndicator>
	);
  };
  
  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
	return (
	  <components.DropdownIndicator {...props}>
		<ChevronDown style={{background: "transparent"}} className="fill-transparent stroke-blue-900/80 hover:stroke-blue-900 dark:stroke-blue-50/80 dark:hover:stroke-blue-50" />
	  </components.DropdownIndicator>
	);
  };
  
  // const Placeholder: React.FC<PlaceholderProps<ColourOption>> = (props) => {
  const Placeholder: React.FC<PlaceholderProps> = (props) => {
	return <components.Placeholder {...props} />;
  };
  


  const IndicatorsContainer: React.FC<IndicatorsContainerProps> = (props) => {
	return <components.IndicatorsContainer {...props} />;
  };
  
  const IndicatorSeparator: React.FC<IndicatorSeparatorProps> = ({
	innerProps,
  }) => {
	return (
	  <span
		className="my-1 mr-1 w-0.5 self-stretch bg-blue-900/80 hover:bg-blue-900 dark:bg-blue-50/80 dark:hover:bg-blue-50"
		{...innerProps}
	  />
	);
  };
  
  export const selectComponent: {
	ClearIndicator: React.FC<ClearIndicatorProps>;
	// IndicatorsContainer: React.FC<IndicatorsContainerProps>;
	IndicatorSeparator: React.FC<IndicatorSeparatorProps>;
	DropdownIndicator: React.FC<DropdownIndicatorProps>;
	
	// Placeholder: React.FC<PlaceholderProps<ColourOption>>;
	Placeholder: React.FC<PlaceholderProps>;
  } = {
	ClearIndicator,
	// IndicatorsContainer,
	IndicatorSeparator,
	DropdownIndicator,
	Placeholder,
  };
  
  export const selectClassStyle =  {
	control: (state: any) =>
	  clsx(
		`rounded-sm border-2 border-slate-500 bg-slate-50/80 pl-2 pr-1 font-medium text-blue-900/90 hover:bg-slate-50/60 dark:border-slate-200/60 dark:bg-slate-600/80 dark:text-blue-50/90 dark:hover:border-slate-200/60 dark:hover:bg-slate-600/60`,
		state.isFocused && "bg-slate-50/90 dark:bg-slate-600/90"
	  ),
	/* IndicatorsContainer: (state: any) =>
	  clsx(
		`bg-slate-50/20 p-1.5 pl-0 hover:bg-slate-50/40 rounded-sm`,
		state.isFocused && `bg-slate-50/60`
	  ), */

	ClearIndicator: (state: any) =>
	  clsx(
		`mx-1 rounded-sm bg-slate-50/20 p-1 hover:bg-slate-50/40 dark:bg-slate-600/20 dark:hover:bg-slate-600/40`,
		state.isFocused && `bg-slate-50/60 dark:bg-slate-600/60`
	  ),	 

	DropdownIndicator: (state: any) =>
	  clsx(
		state.isFocused && `bg-slate-50/60 dark:bg-slate-600/60`,
		`mr-0 rounded-sm bg-slate-50/20 p-1 hover:bg-slate-50/40 dark:bg-slate-50/20 dark:hover:bg-slate-50/40`,
	  ),	  
	menu: (_state: any) => clsx("bg-blue-50/60 dark:bg-slate-600/60"),
	menuList: (_state: any) => clsx("mt-0.5 rounded-sm border-2 border-slate-500 bg-blue-50/60 shadow-md shadow-slate-800/50 dark:border-slate-100/60 dark:bg-blue-900/60 dark:shadow-slate-400/50 dark:hover:border-slate-100/60"),
	// option: (state: any) =>
	option: (state: any) =>
	/*  clsx(
		"font-semibold border-blue-800/80 hover:border-blue-800 text-blue-900/90 hover:text-blue-900  bg-blue-100/80 hover:bg-blue-50/90 dark:border-blue-400/80 dark:hover:border-blue-400 dark:text-blue-50/90 dark:hover:text-blue-50 dark:bg-slate-600/80 dark:hover:bg-blue-800/80 rounded-sm border-2 p-1.5 m-2 mx-auto",
		state.isFocused && `hover:bg-blue-100/80 dark:hover:bg-blue-800/80:`,
		state.isSelected && `bg-blue-600/90 text-blue-50 hover:bg-blue-600/90 hover:text-blue-50 dark:bg-blue-950/90 dark:text-blue-100 dark:hover:bg-blue-950/90 dark:hover:text-blue-100`,
		state.isDisabled &&
		  `bg-slate-400/90 text-slate-800/80 hover:bg-slate-400/90 hover:text-slate-800/80 dark:bg-slate-600/90 dark:text-slate-100/80 dark:hover:bg-slate-600/90 dark:hover:text-slate-100/80 hover:cursor-not-allowed`
	  ), */
	  clsx("rounded-sm",
		!state.isSelected && !state.isDisabled && "m-2 mx-auto rounded-sm border-2 border-blue-800/80 bg-blue-100/80  p-1.5 font-medium text-blue-900/90 hover:border-blue-800 hover:bg-blue-200/80 hover:text-blue-900 dark:border-blue-400/80 dark:bg-slate-600/80 dark:font-normal dark:text-blue-50/90 dark:hover:border-blue-400 dark:hover:bg-blue-900/80 dark:hover:text-blue-50",
		// state.isFocused && `hover:bg-blue-100/80 dark:hover:bg-blue-800/80:`,
		// state.isSelected && `bg-blue-600/90 text-blue-50 hover:bg-blue-600/90 hover:text-blue-50 dark:bg-blue-950/90 dark:text-blue-100 dark:hover:bg-blue-950/90 dark:hover:text-blue-100`,
		state.isSelected && !state.isDisabled && "m-2 mx-auto rounded-sm border-2 border-blue-800 bg-blue-300 p-1.5 font-medium hover:border-blue-800 dark:border-blue-400/80 dark:bg-blue-800 dark:font-normal dark:hover:border-blue-400",
		!state.isSelected && state.isDisabled &&
		  `m-2 mx-auto border-2 bg-slate-400/90 p-1.5 font-medium text-slate-800/80 hover:cursor-not-allowed hover:bg-slate-400/90 hover:text-slate-800/80 dark:bg-slate-600/90 dark:font-normal dark:text-slate-100/80 dark:hover:bg-slate-600/90 dark:hover:text-slate-100/80`,
	  ), 
	singleValue: (_state: any) => clsx("font-semibold text-blue-900 dark:text-blue-50"),
	// placeholder: (_state: any) => clsx("text-blue-800 font-semibold"),
  };
  
  export const selectStyle: {
	menuList: (base: any) => { [key: string]: string };
  } = {
	menuList: (base) => ({
	  ...base,
	  height: "100%",
	  overflowY: "scroll",
	  scrollbarWidth: "none",
	  duration: "1s",
	}),
  };
  