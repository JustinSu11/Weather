import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import WeatherInfoCard from './WeatherInfoCard';

const CityNavigator = (props) => {
    return (
        <Tabs sx={{ borderRadius: '4px' }} value={props.selectedCity?.cityName || false} onChange={(event, newValue) => {
            props.onTabChange(newValue)
        }}>
            <TabList>
                {props.citiesList.map((cityName) => (
                    <Tab variant="plain" color="neutral" key={cityName} value={cityName}>{cityName}</Tab>
                ))}
            </TabList>
            <TabPanel value={props.selectedCity?.cityName || false}>
                {props.selectedCity && <WeatherInfoCard selectedCity={props.selectedCity} />}
            </TabPanel>
        </Tabs>
    )
}

export default CityNavigator;