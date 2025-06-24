import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//displays important weather information for the selected city
export default function WeatherInfoCard(prop) {
    return (
        //container for the weather info card
        <Card sx={{ width: '80vw' }}>
            {/*Actual content inside card*/}
            <CardContent sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                {/*container for the city name and it's temperature*/}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography>
                        {prop.selectedCity.cityName}
                    </Typography>
                    <br />
                    <Typography>
                        {Math.round(prop.selectedCity.weatherInfo.current.temp)}°
                    </Typography>
                </div>
                <Divider orientation='vertical' flexItem />
                {/*secondary weather info display*/}
                <List sx={{flex: 1}}>
                    <ListItem>
                        <ListItemText primary='Feels Like: ' secondary={`${Math.round(prop.selectedCity.weatherInfo.current.feels_like)}°`} />
                    </ListItem>
                    <Divider variant='middle' />
                    <ListItem>
                        <ListItemText primary='Humidity: ' secondary={`${prop.selectedCity.weatherInfo.current.humidity}%`} />
                    </ListItem>
                    <Divider variant='middle' />
                    <ListItem>
                        <ListItemText primary='Wind Speed: ' secondary={`${Math.round(prop.selectedCity.weatherInfo.current.wind_speed)} mph`} />
                    </ListItem>
                    <Divider variant='middle' />
                </List>
            </CardContent>
        </Card>
    )
}