import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import WeatherInfoCard from './WeatherInfoCard';

export const CityNavigator = (props) => {
    return (
        <Tabs>
            <TabList>
                for (const city of props.citiesList) {
                    <Tab variant="plain" color="neutral">city.cityName</Tab>
                }
            </TabList>
            <TabPanel>
                <WeatherInfoCard selectedCity={props.selectedCity} />
            </TabPanel>
        </Tabs>
    )
}