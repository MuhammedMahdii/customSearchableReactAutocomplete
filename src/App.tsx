import React, { useState } from 'react';
import SearchableAutocomplete from './SearchableAutocomplete';
import '@mui/material/styles';

const options = [
  { id: 1, shahrDesc: 'تهران' },
  { id: 2, shahrDesc: 'مشهد' },
  { id: 3, shahrDesc: 'اصفهان' },
];

function App() {
  const [value, setValue] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Searchable Autocomplete Demo</h2>
      <SearchableAutocomplete
        id="city-select"
        options={options}
        value={value}
        onChange={setValue}
        placeholder="انتخاب شهر"
        styles={{ minWidth: 300 }}
      />
    </div>
  );
}

export default App;
