import { Button } from "@mui/material";
export default function SelectBtn(){
  return (
    <Button variant="contained" 
    href="#contained-buttons" 
    color= "secondary" 
    onClick={()=>{alert('clicked')}}>
      Select
    </Button>
  );
}
