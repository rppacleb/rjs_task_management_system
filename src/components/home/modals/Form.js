import { Add, Close, DeleteOutline } from "@mui/icons-material"
import { Box, Button, Divider, Grid, SwipeableDrawer, Switch, TextField } from "@mui/material"
import { tfsx } from "../../../core/styles/global"
import { useDropzone } from "react-dropzone";
import { CloudUploadFill1 } from "../../../core/Icons";
import { validateFileSize } from "../../../core/validator/Validator";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LimitText from "react-show-more-text"
import moment from "moment";

export const Form = ({ form, formHandler, confirmHandler, classes, smdevice, sxdevice }) => {
    const inputs = {...form.data.inputs}

    const onDrop = (files) => {
        const fs = files.map((f) => {
            return {value: f, object: URL.createObjectURL(f), name: f.name, type: f.type.split('/')[0], size: f.size, updated: true, stat: false, msg: ''}
        })

        inputs.files = [...inputs.files, ...fs]
        form.set({...form.data, inputs})
    }
    const { getRootProps, getInputProps} = useDropzone({onDrop, noKeyboard: true});

    const removeFileHandler = (key) => {
        inputs.files = inputs.files.filter((f, k) => k !== key)
        form.set({...form.data, inputs})
    }

    const wstHandler = () => {
        inputs.subtask.toggled = !inputs.subtask.toggled
        form.set({...form.data, inputs})
    }

    const wstListHandler = (m, key) => {
        if (m === 'add') inputs.subtask.list = [...inputs.subtask.list, {value: '', stat: false, msg: '', disabled: false}]
        if (m === 'remove') inputs.subtask.list = inputs.subtask.list.filter((f, k) => k !== key)
        form.set({...form.data, inputs})
    }

    const inputHandler = (e, k) => {
        const {name, value} = e.target
        if (name !== 'subtask') {
            inputs[name] = {value, stat: false, msg: '', disabled: false}
        } else {
            inputs.subtask.list[k] = {value, stat: false, msg: '', disabled: false}
        }
        
        form.set({...form.data, inputs})
    }

    const disableBTNHandler = () => {
        let stat = (inputs.title.value === '' || inputs.task.value === '' || inputs.date.value === '')
        if (stat) return true
        
        if (inputs.subtask.toggled) {
            const stl = inputs.subtask.list.filter((s) => s.value === '')
            stat = stl.length > 0
        }
        return stat
    }

    return (
        <SwipeableDrawer anchor="bottom" open={form.data.toggled} onClose={() => formHandler(null, false)} onOpen={() => formHandler(null, false)} sx={{zIndex: 1201}} PaperProps={{sx: {backgroundColor: 'transparent', height: '100%'}}}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={sxdevice ? 0 : 2}>
                <Box width={sxdevice ? '100%' : 600} height="100%" display="flex" flexDirection="column" bgcolor="#fff" borderRadius={sxdevice ? 0 : 3}>
                    <Box px={3} pt={3}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box fontSize={14} fontWeight={600}>{form.data.method === 'create' ? 'Add' : 'Edit'} Task</Box>
                            <Box component={Button} minWidth="" onClick={() => formHandler(null, false)}><Close sx={{fontSize: 20, color: '#333'}} /></Box>
                        </Box>
                        <Box my={2} mb={3}><Divider /></Box>
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2} sx={{overflow: 'auto'}} px={3} pb={3} pt={1}>
                        <TextField label="Title" variant="outlined" name="title" fullWidth sx={tfsx()} onInput={inputHandler}
                            value={inputs.title.value} error={inputs.title.stat} helperText={inputs.title.msg}
                        />
                        <TextField label="Task" multiline rows={4} name="task" variant="outlined" fullWidth sx={tfsx('area')}
                            value={inputs.task.value} error={inputs.task.stat} helperText={inputs.task.msg} onChange={inputHandler}
                        />
                        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <Box bgcolor="#d3e7f6" borderRadius={10} display="flex" alignItems="center" color="#333" fontSize={12} pr={2}>
                                    <Switch checked={inputs.subtask.toggled} onClick={wstHandler} /> <Box fontSize={12} fontWeight={400}>With Sub-task</Box>
                                </Box>
                                {
                                    inputs.subtask.toggled && (<Box component={Button} minWidth="" onClick={() => wstListHandler('add')}><Add sx={{fontSize: 26}} /></Box>)
                                }
                            </Box>
                            {
                                inputs.subtask.toggled && (
                                    inputs.subtask.list.map((l, k) => (
                                        <Box key={k} display="flex" gap={1} width="100%">
                                            <TextField label={`Subtask ${k+1}`} name="subtask" variant="outlined" fullWidth className={classes.wst_tf}
                                                value={l.value} error={l.stat} helperText={l.msg} onChange={(e) => inputHandler(e, k)}
                                            />
                                            {inputs.subtask.list.length > 1 && <Box component={Button} onClick={() => wstListHandler('remove', k)} minWidth="" borderRadius={2} color="#f5424e"><DeleteOutline /></Box>}
                                        </Box>
                                    ))
                                )
                            }
                        </Box>
                        <Box>
                            <Box fontSize={14} fontWeight={400} mb={0.5}>Date</Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker value={inputs.date.value} onChange={(v)=>inputHandler({target: {name: 'date', value: v}})} minDate={moment().toDate()}
                                    renderInput={(params) => <TextField sx={tfsx()} {...params} fullWidth error={inputs.date.stat} helperText={inputs.date.msg} placeholder="MM/DD/YYYY" size="small" />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box>
                            <Box fontSize={14} fontWeight={400} mb={0.5}>Attach file</Box>
                            <Box {...getRootProps()} textAlign="center" bgcolor="#F1F3F4" border="2px dashed #D7DDDF" borderRadius={2} p={2} sx={{cursor: 'pointer'}}>
                                <Box component="label" htmlFor="attach_file">
                                    <input {...getInputProps()} />
                                    <CloudUploadFill1 fill="#3d9ae2" width={30} height={24} />
                                    <Box fontSize={14} fontWeight={400} color="#3d9ae2">Click to upload or drag & drop</Box>
                                </Box>
                            </Box>
                            <Box mt={1.5}>
                                <Grid container spacing={1.5}>
                                    {
                                        inputs.files.map((f, k) => (
                                            <Grid item xs={6} key={k}>
                                                <Box display="flex" alignItems="center" width="100%" height="100%" gap={1} borderRadius={2} border="1px solid #D7DDDF" p={1}>
                                                    <Box display="flex" alignItems="center" width="100%">
                                                        <Box width="90%">
                                                            <Box fontSize={12} fontWeight={400}>
                                                                <LimitText lines={1} more="" less="" expanded={false} truncatedEndingComponent={"... "}>
                                                                    {f.name}
                                                                </LimitText>
                                                            </Box>
                                                            <Box fontSize={11} fontWeight={400} color="#A2A3A9">{validateFileSize(f.size)}</Box>
                                                        </Box>
                                                        <Box component={Button} minWidth="" onClick={() => removeFileHandler(k)}><Close sx={{fontSize: 12}} /></Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt="auto" px={3} pb={3}>
                        <Box component={Button} onClick={() => confirmHandler(true, form.data.method === 'create' ? 'add' : 'update')} fullWidth bgcolor="#3d9ae2" color="#fff" sx={{':hover': {bgcolor: '#3d9ae2'}}}
                            disabled={disableBTNHandler()}
                        >
                            {form.data.method === 'create' ? 'Save' : 'Update'}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </SwipeableDrawer>
    )
}