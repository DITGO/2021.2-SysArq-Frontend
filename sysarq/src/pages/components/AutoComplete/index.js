import {useState} from 'react'
import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab';
import PropTypes from 'prop-types'

const AutoComplete = ({
	value,
	handleValueChange,
	options,
	optionsLabel,
	propertyCheck,
	sortProperty,
	label,
	helperText,
}) => {
	const [inputValue, setInputValue] = useState("");
	return (
		<Autocomplete
			inputValue={inputValue}
			onChange={(event, newValue) => handleValueChange(event, newValue)}
			value={value}
			onInputChange={(event, newValue) => setInputValue(newValue)}
			options={options.sort((a, b) => {
				const ca = sortProperty ? a[sortProperty].toLowerCase() : a.toLowerCase();
				const cb = sortProperty ? b[sortProperty].toLowerCase() : b.toLowerCase();
				if (ca < cb) return -1;
				if (ca > cb) return 1;
				return 0;
			})}
			getOptionLabel={(option) => optionsLabel(option)}
			getOptionSelected={(option, newValue) => option[propertyCheck] === newValue[propertyCheck]}
			disableClearable
			autoHighlight
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line
					{...params}
					value={params.value}
					label={label}
					variant="outlined"
					error={helperText !== ""}
					helperText={helperText}
				/>
			)}
		/>
	)
}

AutoComplete.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.object
	]).isRequired,
	handleValueChange: PropTypes.func.isRequired,
	inputValue: PropTypes.string.isRequired,
	setInputValue: PropTypes.func.isRequired,
	options: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object), 
		PropTypes.arrayOf(PropTypes.string)
	]).isRequired,
	optionsLabel: PropTypes.func.isRequired,
	propertyCheck: PropTypes.string,
	sortProperty: PropTypes.string,
	label: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
}

AutoComplete.defaultProps = {
	propertyCheck: "",
	sortProperty: null
}

export default AutoComplete;
