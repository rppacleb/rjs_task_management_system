import { Box, Container, useMediaQuery } from "@mui/material"
import { TLogo } from "../../../core/Icons"
import { avatarstylesx } from "../../../core/styles/global"
import { Link } from "react-router-dom"
import BG4 from "../../../assets/images/core/bg4.png"

// LANDING PAGE FOR UNAUTHENTICATED USERS
export const LPage = () => {
    const smdevice = useMediaQuery('(max-width:780px)');
    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" width="100%" bgcolor="#fff" height={60} sx={{zIndex: 1201}}>
                <Container>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                            <TLogo width={30} height={30} />
                            {!smdevice && (<Box fontSize={14} fontWeight={600}>Task Management</Box>)}
                        </Box>
                        <Box display="flex" gap={2}>
                            <Box component={Link} to="/auth/login" bgcolor="#3d9ae2" color="#fff" borderRadius={3} px={3} py={1}>Login</Box>
                            <Box component={Link} to="/auth/registration" bgcolor="#d3e7f6" borderRadius={3} px={3} py={1}>Register</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box width="100%" height="100%">
                <Container sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <Box display="flex" justifyContent="center" sx={avatarstylesx(BG4, '100%', `100%`, 0, smdevice ? '100%' : '80%', smdevice ? '50% 100%' : '50% 140%')} bgcolor='red'>
                        <Box textAlign="center">
                            <Box fontSize={30} fontWeight={800} mt={smdevice ? 20 : 12} color="#313131">Organize, prioritize, and collaborate seamlessly </Box>
                            <Box fontSize={18} fontWeight={600}>on tasks to boost efficiency and achieve your goals.</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}