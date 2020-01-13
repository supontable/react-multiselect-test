import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/dropdown';
import { IOption } from './components/option';

const App: React.FC = () => {
  const citiesList: Array<string> = ['Moscow', 'New York', 'Denpasar', 'Ubud'];
  const [selected, setSelected] = useState<string[]>([])
  const getOptionList = (citiesList: Array<string>): Array<IOption> => {
    return citiesList.map((cityString: string): IOption => {
      return ({ value: cityString, isSelected: selected.indexOf(cityString) >= 0 })
    })
  };

  const optionsList = getOptionList(citiesList);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Dropdown
          optionsList={optionsList}
          selected={selected}
          onSelectedChanged={(selected: string[]) => setSelected(selected)}
        />
      </header>
    </div>
  );
}

export default App;
