import { useEffect, useState } from 'react';
import './App.css';
import { PeriodSelector } from './components/period-selector';
import type { Period } from './types/data';
import { Slider } from './components/slider';
import { Navigation } from './components/navigation';
import { Title } from './components/title';
import { Years } from './components/years';
import { Grid } from './layout/grid';
import { GridArea } from './layout/grid-area';
import { findExtremeYears } from './utils/find-extreme';

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [data, setData] = useState<Period[]>([]);

  useEffect(() => {
    fetch('./data.json')
      .then((res): Promise< { periods: Period[] }> => res.json())
      .then((res) => setData(res.periods))
      .catch((err: unknown) => {
        console.error(err);
      });
    
  }, []);

  const { min, max } = findExtremeYears(data[selectedPeriod]);
  
  return (
    <div className="container">
      <Title />
      <Years from={min} to={max}/>
      {data.length && <>
        <Grid>
          <GridArea areaName="selector">
            <PeriodSelector periods={data} selected={selectedPeriod}
              setSelected={setSelectedPeriod}/>
          </GridArea>
          <GridArea areaName="navigation">
            <Navigation selected={selectedPeriod} total={data.length}
              setSelected={setSelectedPeriod} />
          </GridArea>
          <GridArea areaName="slider">
            <Slider events={data[selectedPeriod].events}/>
          </GridArea>
        </Grid>
      </>}
    </div>
  );
}

export default App;
