import { useState } from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./components/TabPanel";
import Characters from "./components/Characters";
import Favorites from "./components/Favorites";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container>
      <h1>Marvel Characters</h1>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Characters" {...a11yProps(0)} />
        <Tab label="Favorites" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Characters />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Favorites />
      </TabPanel>
    </Container>
  );
}

export default App;
