import { useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";

const AutoComplete = ({
	value,
	handleValueChange,
	options,
	optionsLabel,
	propertyCheck,
	sortProperty,
	label,
	helperText,
	type,
	className,
	freeField,
}) => {
	const [inputValue, setInputValue] = useState("");

	options = options.filter((el) => el);

	return (
		<Autocomplete
			onChange={(event, newValue) => handleValueChange(event, newValue)}
			value={value}
			onInputChange={(event, newValue) => setInputValue(newValue)}
			inputValue={inputValue}
			options={options.sort((a, b) => {
				const ca = sortProperty
					? a[sortProperty].toString().toLowerCase()
					: a.toString().toLowerCase();
				const cb = sortProperty
					? b[sortProperty].toString().toLowerCase()
					: b.toString().toLowerCase();
				if (ca < cb) return -1;
				if (ca > cb) return 1;
				return 0;
			})}
			getOptionLabel={(option) => optionsLabel(option)}
			getOptionSelected={(option, newValue) =>
				propertyCheck
					? option[propertyCheck] === newValue[propertyCheck]
					: option === newValue
			}
			freeSolo={freeField}
			autoSelect
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line
					{...params}
					value={params.value}
					type={type}
					className={className}
					label={label}
					variant="outlined"
					error={helperText !== ""}
					helperText={helperText}
				/>
			)}
		/>
	);
};

AutoComplete.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	handleValueChange: PropTypes.func.isRequired,
	inputValue: PropTypes.string.isRequired,
	setInputValue: PropTypes.func.isRequired,
	options: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.arrayOf(PropTypes.string),
	]).isRequired,
	optionsLabel: PropTypes.func.isRequired,
	propertyCheck: PropTypes.string,
	sortProperty: PropTypes.string,
	label: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
	type: PropTypes.string,
	className: PropTypes.string,
	freeField: PropTypes.bool.isRequired,
};

AutoComplete.defaultProps = {
	propertyCheck: "",
	sortProperty: null,
	type: "text",
	className: "",
};

export default AutoComplete;
