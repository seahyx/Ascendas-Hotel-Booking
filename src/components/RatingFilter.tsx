import { FormControlLabel, FormGroup, Checkbox, Rating, Typography } from "@mui/material";

export default function RatingFilter() {

	const numberOfFilters = 5;
  const filters = [];
  for (let i = numberOfFilters; i > 0; i--) {
    filters.push(<FormControlLabel label={<Rating value={i} readOnly />}
        control={<Checkbox size="small" value={i} 
					
				/>}
      />
    );
  }
  return (<>
		<Typography className="pl-4 font-bold text-xs">HOTEL STAR RATING</Typography>
		<FormGroup className="pl-6">{filters}</FormGroup>
	</>
	);
}
