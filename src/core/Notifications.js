import { CheckCircle } from "@mui/icons-material"
import { Box, Snackbar } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const MonoSnack = () => {
    const { tool_state } = useContext(AppContext)
    const { notifications } = {...tool_state}
    const { data: {mono_snack}} = {...notifications}

    const closeHandler = () => {
        let notifs = {...notifications.data}
        notifs.mono_snack = {...notifs.mono_snack, toggled: false}
        notifications.set(notifs)
    }

    return (
        <Snackbar anchorOrigin={{vertical: mono_snack.vertical, horizontal: mono_snack.horizontal}} open={mono_snack.toggled} autoHideDuration={mono_snack.duration} onClose={closeHandler}>
            <Box m={3} mt={10} borderRadius={3} bgcolor="#00BE81" fontSize={16} display="flex" justifyContent="center" alignItems="center" minHeight="44px" color="#ffffff" px={2}>
                <Box display="flex" justifyContent="center" alignItems="center"> 
                    <CheckCircle /> <Box px={1} fontSize={12}>{mono_snack.msg}</Box>
                </Box>   
            </Box>
        </Snackbar>
    )
}