import { Box, Button, Dialog } from "@mui/material"
import { SnakeLoader } from "../../../core/loaders/SnakeLoader"
import { UserLoad1 } from "../../../core/Icons"

export const Confirmation = ({form, submitHandler, confirmHandler, updateStatHandler }) => {
    const content = {
        add: {msg: 'Add this task?', handler: submitHandler, status: 'add'},
        update: {msg: 'Update this task?', handler: submitHandler, status: 'update'},
        ip: {msg: 'Move this task to In progress?', handler: updateStatHandler, status: 2},
        complete: {msg: 'Mark this task as complete?', handler: updateStatHandler, status: 3},
        remove: {msg: 'Remove this task?', handler: updateStatHandler, status: 'remove'},
        restore: {msg: 'Restore this task?', handler: updateStatHandler, status: 'restore'},
        premove: {msg: 'Permanently remove this task?', handler: updateStatHandler, status: 'premove'},
    }

    return (
        <Dialog open={form.data.confirmation.toggled} keepMounted fullWidth={true} maxWidth={'md'} PaperProps={{
            style: {display: 'flex', alignItems: 'center', backgroundColor: 'transparent', boxShadow: 'none'}
        }}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width={381} height={213} bgcolor="#fff" borderRadius={2} p={3}>
                <UserLoad1 fill="#A2A3A9" width={56} height={56} />
                <Box fontSize={20} fontWeight={700} mt={2.5}>{form.data.confirmation.type !== '' && content[form.data.confirmation.type].msg}</Box>
                <Box mt="auto" display="flex" gap={1.5}>
                    <Box component={Button} disabled={form.data.submitted} bgcolor="#f6fbff" color="#333" sx={{':hover':{ bgcolor: '#DFEEE6' }}} borderRadius={2} onClick={() => confirmHandler(false, '')}>No</Box>
                    <Box component={Button} disabled={form.data.submitted} bgcolor="#3d9ae2" color="#fff" sx={{':hover':{ bgcolor: '#3d9ae2' }}} borderRadius={2} onClick={() => content[form.data.confirmation.type].handler(content[form.data.confirmation.type].status)}>{form.data.submitted ? <SnakeLoader size="5px" bg="#fff" distance="2px" /> : 'Yes'}</Box>
                </Box>
            </Box>
        </Dialog>
    )
}