import { Route, Switch } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { LPage } from '../../components/__authentication/LPage/Index';
import { Verification } from '../../components/__authentication/verification/Index';

export const AuthRoute = () => {
    return (
        <Switch>
            {/* HOME */}
            <Route exact path="/" render={props=>(Render(LPage, props))}/>
            <Route exact path="/auth/:type" render={props=>(Render(Verification, props))}/>

            {/* 404 NOT FOUND */}
            <Route>
                <Container>
                    <Box display="flex">
                        Error 404
                    </Box>
                </Container>
            </Route>
        </Switch>
    )
}

const Render = (Component, props) => {
    return (
        <Box display="flex" width="100%" height="100%">
            {/* <Navigation side={1} /> */}
            <Box display="flex" flexDirection="column" width="100%" height="100%">
                {/* <Navigation side={0} /> */}
                <Box component="main" flex={1} sx={{overflowY: 'auto'}}>
                    <Box sx={{position: 'relative'}} width="100%" height="100%">
                        <Box width="100%" height="100%"> <Component {...props} /></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


