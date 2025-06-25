import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import WeatherInfoCard from './WeatherInfoCard';

const CityNavigator = (props) => {
    return (
        <Tabs sx={{ borderRadius: '4px' }} value={props.selectedCity ? `${props.selectedCity.cityName.name}, ${props.selectedCity.cityName.state}` : false} onChange={(event, newValue) => {
            props.onTabChange(newValue)
            console.log('Tab changed to:', newValue)
        }}>
            <TabList>
                {props.citiesList.map((cityNameAndState) => {
                console.log('City name and state:', cityNameAndState)
                return (
                    <Tab sx={{borderRadius: '4px'}} variant="plain" color="neutral" key={`${cityNameAndState.name}, ${cityNameAndState.state}`} value={`${cityNameAndState.name}, ${cityNameAndState.state}`}>{cityNameAndState.name}</Tab>
                )})}
            </TabList>
            <TabPanel value={props.selectedCity ? `${props.selectedCity.cityName.name}, ${props.selectedCity.cityName.state}` : false}>
                {props.selectedCity && <WeatherInfoCard selectedCity={props.selectedCity} />}
            </TabPanel>
        </Tabs>
    )
}

export default CityNavigator;