import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import WeatherInfoCard from './WeatherInfoCard';

const CityNavigator = (props) => {
    return (
        <Tabs sx={{ borderRadius: '4px' }}>
            <TabList>
                {props.citiesList.map((city) => (
                    <Tab variant="plain" color="neutral">{city.cityName}</Tab>
                ))}
            </TabList>
            <TabPanel>
                <WeatherInfoCard selectedCity={props.selectedCity} />
            </TabPanel>
        </Tabs>
    )
}

export default CityNavigator;