import React, {useEffect, useMemo, useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';

const SearchableAutocomplete = ({options, value, onChange, placeholder, styles,id}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [localOptions, setLocalOptions] = useState(options);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setLocalOptions(options);
	}, [options]);

	const normalizeText = (text) => {
		if (!text) return '';
		return text
			.replace(/ي/g, 'ی')
			.replace(/ك/g, 'ک')
			.replace(/ى/g, 'ی')
			.replace(/ة/g, 'ه')
			.replace(/ؤ/g, 'و')
			.replace(/إ/g, 'ا')
			.replace(/أ/g, 'ا')
			.replace(/آ/g, 'ا')
			.replace(/\s+/g, ' ')
			.trim();
	};
	const filteredOptions = useMemo(() => {
		if (!searchTerm || searchTerm.trim() === '') {
			return localOptions;
		}

		const normalizedSearch = normalizeText(searchTerm);

		const exactMatches = localOptions.filter(option => {
			const normalizedOption = normalizeText(option.shahrDesc);
			return normalizedOption === normalizedSearch;
		});

		const partialMatches = localOptions.filter(option => {
			const normalizedOption = normalizeText(option.shahrDesc);
			return normalizedOption.includes(normalizedSearch) &&
				!exactMatches.includes(option);
		});

		return [...exactMatches, ...partialMatches];

	}, [searchTerm, localOptions]);

	const handleOptionSelect = (event, selectedValue) => {
		if (selectedValue) {
			onChange(selectedValue);
			setSearchTerm('');
			setOpen(false);
		}
	};

	const handleInputChange = (event, newValue, reason) => {
		if (reason === 'reset') {
			setSearchTerm('');
			return;
		}

		if (reason === 'clear') {
			setSearchTerm('');
			onChange(null);
			return;
		}

		setSearchTerm(newValue);
	};

	useEffect(() => {
		return () => {
			setSearchTerm('');
			setOpen(false);
		};
	}, []);
	return (
		<Autocomplete
			id={id}
			disablePortal
			disableClearable
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => {
				setOpen(false);
				if (!value) {
					setSearchTerm('');
				}
			}}
			openOnFocus
			style={{minWidth: '100px', marginTop: '5px', marginRight: '10px'}}
			options={filteredOptions}
			value={value}
			getOptionLabel={(option) => {
				if (!option) return '';
				return option.shahrDesc || '';
			}}
			isOptionEqualToValue={(option, val) => {
				if (!option || !val) return false;
				return option.id === val.id;
			}}
			onInputChange={handleInputChange}
			onChange={handleOptionSelect}
			renderOption={(props, option) => (
				<li {...props} key={option.id}>
					{option.shahrDesc}
				</li>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={placeholder}
					className="cssjss-plate-text-field"
					style={styles}
					InputProps={{
						...params.InputProps,
						style: {
							...styles,
							fontFamily: 'IRANSans2 !important',
						}
					}}
				/>
			)}
			ListboxProps={{
				style: {
					maxHeight: '200px',
					fontFamily: 'IRANSans2 !important',
				}
			}}
			filterOptions={(x) => x}
		/>
	);
};

export default SearchableAutocomplete;