import React from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import { DropdownProvider } from '../src/DropdownContext';

const initialList: Array<string> = ['Moscow', 'New York', 'Denpasar', 'Ubud']
const seconfdList: Array<string> = ['Foo', 'Bar', 'FooBar', 'FooBaz']
const App: React.FC = () => {
  return (
    <div className="App">
        <DropdownProvider>
          <Dropdown initialList={initialList} />
        </DropdownProvider>
        <DropdownProvider>
          <Dropdown initialList={seconfdList} />
        </DropdownProvider>
    </div>
  );
}

export default App;
