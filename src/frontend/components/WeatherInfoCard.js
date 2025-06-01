import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function WeatherInfoCard(prop) {
    return (
        <Card>
            <CardContent >
                <Typography sx={{ alignItems: 'center'}}>
                    {prop.weatherDetailName}
                </Typography>
                <br />
                <Typography sx={{ alignItems: 'center'}}>
                    {prop.weatherDetailValue}{prop.weatherDetaulUnit}
                </Typography>
            </CardContent>
        </Card>
    )
}