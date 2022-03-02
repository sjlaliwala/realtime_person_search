import * as React from 'react';
import { CardContent, Paper, Typography, Box } from '@mui/material';

const DETAIL_FONT_SIZE = 16
const DETAIL_FONT_WEIGHT = '400'

export default function PersonCard(props: any) {
  let info = props.info
  return (
    <Box>
      <Paper elevation={3}>
        <React.Fragment>
          <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <Typography variant="h5" color="text.primary" gutterBottom>
                <b>{`${info.first_name} ${info.last_name}`}</b>
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                <b>Address</b>
            </Typography>

            <Typography sx={{fontSize: DETAIL_FONT_SIZE, fontWeight: DETAIL_FONT_WEIGHT}}>
              {info.address_street}
            </Typography>
            <Typography sx={{fontSize: DETAIL_FONT_SIZE, fontWeight: DETAIL_FONT_WEIGHT}}>
              {`${info.address_city},  ${info.address_state}`}
            </Typography> 
            <Typography sx={{fontSize: DETAIL_FONT_SIZE, fontWeight: DETAIL_FONT_WEIGHT}}>
              {`${info.address_zip}`}
            </Typography>       
          </CardContent>
        </React.Fragment>
      </Paper>
    </Box>
  );
}