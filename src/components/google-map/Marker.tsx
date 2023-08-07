import { Place } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export interface MarkerProps {
  lat: number;
  lng: number;
  tooltip: string;
  color?: any;
}

const Marker = ({ lat, lng, tooltip, color }: MarkerProps) => {
  return (
    <div className="relative" lat={lat} lng={lng}>
      <Tooltip title={tooltip} arrow>
        <Place
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 active:scale-90"
          fontSize="large"
          color={color}
        />
      </Tooltip>
    </div>
  );
};

export default Marker;
