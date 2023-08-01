import { Button } from "@mui/material";
export default function SelectBtn(){
  return (
    <Button variant="contained" 
    href="#contained-buttons" 
    style={{ backgroundColor: "#ffa500", color: "#fff" }}
    onClick={()=>{alert('clicked')}}>
      Select
    </Button>
  );
}
