import * as React from "react"
import { Box, Button, Dialog, Divider, Grid, Slide } from "@mui/material";
import { FileFill1 } from "../../../core/Icons";
import { validateFileSize } from "../../../core/validator/Validator";
import { Close, DeleteOutline, Edit } from "@mui/icons-material";
import LimitText from "react-show-more-text"
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export const Preview = ({ tasks, previewHandler, confirmHandler, editHandler, tab, smdevice, sxdevice }) => {
    const selected = {...tasks.data.selected}
    const dlHandler = (file, name) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = file;
        downloadLink.download = name;
        downloadLink.textContent = "Download File";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        URL.revokeObjectURL(file);
    }
    
    return (
        <Dialog open={selected.toggled} fullScreen onClose={() => previewHandler(false, null)} TransitionComponent={Transition} keepMounted fullWidth={true} maxWidth={'md'} 
            PaperProps={{
                style: {backgroundColor: 'transparent', boxShadow: 'none', width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}
            }}
        >
            {
                selected.task !== null && (
                    <Box display="flex" alignItems="flex-start" justifyContent="flex-end" gap={1} width="100%" height="100%" p="16px 0 16px 0" sx={{overflowY: 'auto'}}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Box component={Button} minWidth="" display="flex" p={1} bgcolor="#fff" color="#333" borderRadius="50%" sx={{':hover': {bgcolor: '#fff'}}} onClick={() => previewHandler(false, null)}><Close /></Box>
                            {
                                tab !== 'trash' && (
                                    <Box component={Button} minWidth="" display="flex" p={1} bgcolor="#fff" borderRadius="50%" sx={{':hover': {bgcolor: '#fff'}}} onClick={() => editHandler(false, null)}><Edit /></Box>
                                )
                            }
                            {
                                tab !== 'trash' && (
                                    <Box component={Button} minWidth="" display="flex" p={1} bgcolor="#FA3E3E" color="#fff" borderRadius="50%" sx={{':hover': {bgcolor: '#FA3E3E'}}} onClick={() => confirmHandler(true, 'remove')}><DeleteOutline /></Box>
                                )
                            }
                        </Box>
                        <Box display="flex" flexDirection="column" width={sxdevice ? 340 : smdevice ? 550 :  720} height="100%" bgcolor="#fff" borderRadius="16px 0 0 16px">
                            <Box display="flex" alignItems="center" gap={2} px={2.5} pt={2.5}>
                                <Box fontSize={16} fontWeight={600}>Task Information</Box>
                                <Box fontSize={14} fontWeight={400} p="0 8px" borderRadius={5}
                                    bgcolor={selected.task.status === 1 ? '#DEEBFF' : selected.task.status === 2 ? '#E8F5E9' : '#008F5D'} 
                                    color={selected.task.status === 1 ? '#0052CC' : selected.task.status === 2 ? '#008F5D' : '#fff'}
                                >
                                    {selected.task.status === 1 ? 'Todo' : selected.task.status === 2 ? 'In Progress' : 'Completed'}
                                </Box>
                            </Box>
                            <Box my={2.5}><Divider sx={{width: '100%', borderBottomWidth: 1, bgcolor: '#1893F1', opacity: '0.2'}} /></Box>
                            <Box mt={2} pb={5} px={2.5} sx={{overflowY: 'auto'}} height="100%">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box fontSize={14} fontWeight={400} mb={0.5} color="#6A6A6A">Title</Box>
                                        <Box display="flex" alignItems="center" px={1} height={45} borderRadius="6px" border="1px solid #F1F3F4" color="#313131">{selected.task.title}</Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box fontSize={14} fontWeight={400} mb={0.5} color="#6A6A6A">Task</Box>
                                        <Box gap={1} p={1} height={158} borderRadius="6px" border="1px solid #F1F3F4" color="#313131" sx={{overflow: 'auto'}}>
                                            {
                                                selected.task.task.split('\n').map((v, k) => {
                                                    if (v !== '') {
                                                        return <Box key={k}> {v} </Box>
                                                    }

                                                    return <Box key={k} height={24} />
                                                })
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box fontSize={14} fontWeight={400} mb={0.5} color="#6A6A6A">Sub-task</Box>
                                        <Box display="flex" flexDirection="column" gap={1}>
                                            {
                                                selected.task.subtask.map((s, k) => (
                                                    <Box key={k} display="flex" alignItems="center" px={1} height={45} borderRadius="6px" border="1px solid #F1F3F4"  bgcolor="#D3E7F6" color="#313131">{s.value}</Box>
                                                ))
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box fontSize={14} fontWeight={400} mb={0.5} color="#6A6A6A">Date</Box>
                                        <Box display="flex" alignItems="center" px={1} height={45} borderRadius="6px" border="1px solid #F1F3F4" color="#313131">{moment(selected.task.date).format('MMMM DD, YYYY')}</Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box fontSize={14} fontWeight={400} mb={0.5} color="#6A6A6A">Attached files</Box>
                                        <Grid container spacing={1.5}>
                                            {
                                                selected.task.files.map((f, k) => (
                                                    <Grid item xs={6} key={k}>
                                                        <Box display="flex" alignItems="center" width="100%" sx={{cursor:'pointer', ':hover': {bgcolor: '#E8F0ED'}}} height="100%" gap={1} borderRadius={2} border="1px solid #D7DDDF" p={1} onClick={() => dlHandler(f.object, f.name)}>
                                                            <Box display="flex" width={24}><FileFill1 fill="#A2A3A9" width={24} height={28} /></Box>
                                                            <Box width={277.94}>
                                                                <Box fontSize={12} fontWeight={400} color="#313131">
                                                                    <LimitText lines={1} more="" less="" expanded={false} truncatedEndingComponent={"... "}>
                                                                        {f.name}
                                                                    </LimitText>
                                                                </Box>
                                                                <Box fontSize={11} fontWeight={400} color="#A2A3A9">{validateFileSize(f.size)}</Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mt="auto" px={2.5} pb={2.5}>
                                <Grid container spacing={1.5}>
                                    {
                                        (selected.task.status === 1 && tab !== 'trash') && (
                                            <Grid item xs>
                                                <Box component={Button} py={1} minWidth="" bgcolor="#313131" color="#fff" sx={{':hover': {bgcolor: '#313131'}}} borderRadius={2} fullWidth onClick={() => confirmHandler(true, 'ip')}>In progress</Box>
                                            </Grid>
                                        )
                                    }
                                    {
                                        ((selected.task.status === 1 || selected.task.status === 2) && tab !== 'trash') && (
                                            <Grid item xs>
                                                <Box component={Button} py={1} minWidth="" bgcolor="#008F5D" color="#fff" sx={{':hover': {bgcolor: '#008F5D'}}} borderRadius={2} fullWidth onClick={() => confirmHandler(true, 'complete')}>Complete</Box>
                                            </Grid>
                                        )
                                    }
                                    {
                                        tab === 'trash' && (
                                            <Grid item xs>
                                                <Box component={Button} py={1} minWidth="" bgcolor="#FA3E3E" color="#fff" sx={{':hover': {bgcolor: '#FA3E3E'}}} borderRadius={2} fullWidth onClick={() => confirmHandler(true, 'premove')}>Permanent remove</Box>
                                            </Grid>
                                        )
                                    }
                                    {
                                        tab === 'trash' && (
                                            <Grid item xs>
                                                <Box component={Button} py={1} minWidth="" bgcolor="#008F5D" color="#fff" sx={{':hover': {bgcolor: '#008F5D'}}} borderRadius={2} fullWidth onClick={() => confirmHandler(true, 'restore')}>Restore</Box>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </Dialog>
    )
}