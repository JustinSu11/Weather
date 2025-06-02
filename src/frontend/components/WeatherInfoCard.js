import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function WeatherInfoCard(prop) {
    return (
        <Card>
            <CardContent sx={{display: 'flex', flexDirection: 'row'}} >
                <div>
                    <Typography>
                        {prop.selectedCity.cityName}
                    </Typography>
                    <br />
                    <Typography>
                        {Math.round(prop.selectedCity.weatherInfo.current.temp)}°
                    </Typography>
                </div>
                <Divider orientation='vertical'/>
                <List>
                    <ListItem>
                        <ListItemText primary='Feels Like: ' secondary={`${prop.selectedCity.weatherInfo.current.feels_like}°`} />
                    </ListItem>
                    <Divider variant='middle' />
                    <ListItem>
                        <ListItemText primary='Humidity: ' secondary={`${prop.selectedCity.weatherInfo.current.humidity}%`} />
                    </ListItem>
                    <Divider variant='middle' />
                    <ListItem>
                        <ListItemText primary='Wind Speed: ' secondary={`${prop.selectedCity.weatherInfo.current.wind_speed} mph`} />
                    </ListItem>
                    <Divider variant='middle' />
                </List>
            </CardContent>
        </Card>
    )
}