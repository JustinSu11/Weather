import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function WeatherInfoCard(prop) {
    return (
        <Card>
            <CardContent sx={{ alignItems: 'center'}}>
                <Typography>
                    {prop.weatherDetailName}
                </Typography>
                <br />
                <Typography>
                    {prop.weatherDetailValue}{prop.weatherDetaulUnit}
                </Typography>
            </CardContent>
        </Card>
    )
}