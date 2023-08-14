import { Route, Switch } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Home } from '../../components/home/Index';
import { TNavigation } from '../../components/layouts/navigations/Top';

export const MainRoute = () => {
    return (
        <Switch>
            {/* HOME */}
            <Route exact path="/tasks/:tab" render={props=>(Render(Home, props))}/>

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
        <Box display="flex" flexDirection="column" width="100%" height="100%">
            <TNavigation />
            <Box component="main" flex={1} sx={{overflowY: 'auto'}}>
                <Box sx={{position: 'relative'}} width="100%" height="100%">
                    <Box width="100%" height="100%"> <Component {...props} /></Box>
                </Box>
            </Box>
        </Box>
    )
}


