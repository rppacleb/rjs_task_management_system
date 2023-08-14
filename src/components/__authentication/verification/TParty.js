import { Box, Button } from "@mui/material"
import AuthG from 'react-google-login';
import IGoogle from '../../../assets/images/icons/google_btn.png'
import { avatarstylesx } from "../../../core/styles/global";

export const TParty = () => {
    const responseHandler = (e) => {
        console.log(e)
    }
    
    return (
        <AuthG clientId="895650183588-u8rmd80k9c3450moo52tob7lpqqusi1m.apps.googleusercontent.com" render={props => (
                <Box component={Button} gap={2} borderRadius={2} variant="contained" fullWidth onClick={props.onClick}>
                    <Box sx={avatarstylesx(IGoogle, 25, 25)} /> <Box color='#fff' component="b" fontWeight="600">Continue with Google</Box>
                </Box>
            )} buttonText="Login" onSuccess={(e)=>responseHandler(e, 'google')} onFailure={(e)=>responseHandler(e, 'google')} cookiePolicy={'single_host_origin'}
        />
    )
}