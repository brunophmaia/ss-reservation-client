import { Button, CircularProgress } from "@mui/material";
import { cyan } from '@mui/material/colors';

export default function LoadingButton({text, onClick, disabled, showLoading}: any) {
    
    return <Button onClick={onClick} disabled={disabled || showLoading} className="w100" variant="contained">{text}
                {showLoading && <CircularProgress 
                                    className="m-l-10"
                                    size={24}
                                    sx={{
                                        color: cyan[400]
                                    }} />}
           </Button>;
}