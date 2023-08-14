import { Box, Button, Container, useMediaQuery } from "@mui/material"
import { TLogo } from "../../../core/Icons"
import { Logout as ILogout } from "@mui/icons-material"
import { useHistory } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../../../core/contexts/AppContext"

export const TNavigation = () => {
    const { app_state } = useContext(AppContext)
    const smdevice = useMediaQuery('(max-width:780px)');
    const { __SESSION } = {...app_state}

    const history = useHistory()
    const logoutHandler = () => {
        localStorage.removeItem('tdl_app_session')
        __SESSION.set(null)
        history.push(`/auth/login`)
    }

    return (
        <Box display="flex" alignItems="center" width="100%" bgcolor="#fff" height={60} sx={{boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)', zIndex: 1201}}>
            <Container>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <TLogo width={30} height={30} />
                        {!smdevice && <Box fontSize={14} fontWeight={600}>Task Management</Box>}
                    </Box>
                    <Box component={Button} borderRadius={2} color="#333" fontSize={14} display="flex" alignItems="center" gap={1} onClick={logoutHandler}> <ILogout sx={{fontSize: 14}} /> Logout</Box>
                </Box>
            </Container>
        </Box>
    )
}