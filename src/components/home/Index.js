import { Box, Button, Container, IconButton, InputAdornment, TextField, useMediaQuery } from "@mui/material"
import { tf } from "../../core/styles/global"
import { Add, CalendarMonthOutlined, DeleteOutline, Search } from "@mui/icons-material"
import { Form } from "./modals/Form"
import { useContext } from "react"
import { AppContext } from "../../core/contexts/AppContext"
import { Confirmation } from "./modals/Confirmation"
import { ActiveList } from "./List"
import { Preview } from "./modals/Preview"
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom"
import { useMemo } from "react"
import moment from "moment"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Home = ({ match }) => {
    const { home_state } = useContext(AppContext)
    const { form, tasks } = {...home_state}
    const { tab } = {...match.params}
    const lgdevice = useMediaQuery('(max-width:1039px)');
    const smdevice = useMediaQuery('(max-width:987px)');
    const sxdevice = useMediaQuery('(max-width:658px)');
    const l = {active: ActiveList, trash: ActiveList}
    const List = l[tab!=='trash' ? 'active' : 'trash']
    const classes = tf()
    const history = useHistory()

    const __filter  = useMemo(() => {
        let list = tab === 'trash' ? tasks.data.trash : tasks.data.list.filter((l) => l.status === (tab !== 'all' ? JSON.parse(tab) : l.status))
        const sd = moment(tasks.data.date_filter.start)
        const ed = moment(tasks.data.date_filter.end)
        list = list.filter((l) => {
            const dtc = moment(l.date)
            return dtc.isBetween(sd, ed, null, '[)')
        })

        if (tasks.data.search === '') return list

        return list.filter((l) => (
            l.title.toLowerCase().includes(tasks.data.search.toLowerCase()) || l.task.toLowerCase().includes(tasks.data.search.toLowerCase())
        ))
    }, [tab, tasks.data.list, tasks.data.trash, tasks.data.search, tasks.data.date_filter.start, tasks.data.date_filter.end])

    const searchHandler = (e) => {
        const { value } = e.target
        tasks.set({...tasks.data, search: value})
    }

    const dateFilterHandler = (dates) => {
        const [start, end] = dates;
        const fs = moment(moment(start).format('MMMM-DD-YYYY'))
        const fe = moment(moment(end).format('MMMM-DD-YYYY'))
        if (fs.isSame(fe, 'day')) {
            tasks.set({...tasks.data, date_filter: {toggled: true, start: moment(moment(fs).format('MMMM-DD-YYYY [00:00:01]')).toDate(), end: moment(moment(fe).format('MMMM-DD-YYYY [23:23:59]')).toDate()}})
        } else {
            tasks.set({...tasks.data, date_filter: {toggled: true, start, end}})
        }
    }

    const tabHandler = (t) => {
        history.push(`/tasks/${t}`)
    }

    const formHandler = (method, toggled) => {
        form.set({
            method, toggled, confirmation: {toggled: false, type: ''}, submitted: false,
            inputs: {
                title: {value: '', stat: false, msg: '', disabled: false},
                task: {value: '', stat: false, msg: '', disabled: false},
                date: {value: '', stat: false, msg: '', disabled: false},
                subtask: {
                    toggled: false,
                    list: [{value: '', stat: false, msg: '', disabled: false}]
                },
                files: []
            }
        })
    }

    const editHandler = () => {
        form.set({
            method: 'update', toggled: true, confirmation: {toggled: false, type: ''}, submitted: false,
            id: tasks.data.selected.task.id,
            inputs: {
                title: {value: tasks.data.selected.task.title , stat: false, msg: '', disabled: false},
                task: {value: tasks.data.selected.task.task , stat: false, msg: '', disabled: false},
                date: {value: tasks.data.selected.task.date , stat: false, msg: '', disabled: false},
                subtask: {
                    toggled: tasks.data.selected.task.subtask.length > 0,
                    list: tasks.data.selected.task.subtask.length > 0 ? tasks.data.selected.task.subtask : [{value: '', stat: false, msg: '', disabled: false}]
                },
                files: tasks.data.selected.task.files
            }
        })

        previewHandler(false, null)
    }

    
    const confirmHandler = (toggled, type) => {
		form.set({...form.data, confirmation: {...form.data.confirmation, toggled, type}})
	}

    const submitHandler = (m) => {
        let list = [...tasks.data.list]
        let task = {
            title: form.data.inputs.title.value,
            task: form.data.inputs.task.value,
            date: form.data.inputs.date.value,
            files: form.data.inputs.files,
            subtask: form.data.inputs.subtask.toggled ? form.data.inputs.subtask.list : []
        }

        if (m === 'add') {
            task.id = uuidv4()
            task.status = 1
            task.trashed = false
            list = [task, ...list].sort((a, b) => b.date - a.date)
        } else {
            list = list.map((l) => {
                if (l.id === form.data.id) {
                    return {...l, ...task}
                }

                return l
            })
        }

        tasks.set({...tasks.data, list})
        formHandler(null, false)
    }

    const previewHandler = (toggled, task) => {
        tasks.set({...tasks.data, selected: {toggled, task}})
    }

    const updateStatHandler = (status) => {
        let tlist = [...tasks.data.list]
        let rlist = [...tasks.data.trash]
        let h = 'trash'

        if (status === 2 || status === 3) {
            tlist = tlist.map((t) => {
                if (t.id === tasks.data.selected.task.id) {
                    return {...t, status}
                }

                return t
            })
            h = status
        }
        if (status === 'remove') {
            rlist = [tasks.data.selected.task, ...rlist]
            tlist = tlist.filter((t) => t.id !== tasks.data.selected.task.id)
            h = 'trash'
        }

        if (status === 'restore') {
            tlist = [tasks.data.selected.task, ...tlist]
            rlist = rlist.filter((t) => t.id !== tasks.data.selected.task.id)
            h = tasks.data.selected.task.status
        }

        if (status === 'premove') rlist = rlist.filter((r) => r.id !== tasks.data.selected.task.id)

        tlist = tlist.sort((a, b) => b.date - a.date)
        rlist = rlist.sort((a, b) => b.date - a.date)
        tasks.set({...tasks.data, selected: {toggled: false, task: null}, list: tlist, trash: rlist})
        confirmHandler(false, '')
        history.push(h)
    }

    return (
        <Container sx={{height: '100%', display: 'flex', flexDirection: 'column'}} height="100%" maxWidth={smdevice ? 'xl' : 'lg'} disableGutters={sxdevice}>
            <Box display="flex" flexDirection="column" py={3} width="100%" height="100%">
                <Box display="flex" alignItems="center" justifyContent="space-between" px={sxdevice ? 1 : 0}>
                    <Box fontSize={20} fontWeight={700}>Tasks Board</Box>
                    <Box component={Button} onClick={() => formHandler('create', true)} bgcolor="#3d9ae2" borderRadius={3} px={3} py={1} gap={1} color="#fff" sx={{':hover': {bgcolor: '#3d9ae2'}}}><Add /> Task</Box>
                </Box>
                <Box display="flex" flexDirection={smdevice ? 'column' : 'row'} justifyContent={smdevice ? 'center' : 'space-between'} alignItems={smdevice ? 'center' : 'space-between'} gap={smdevice ? 3 : 2} mt={5} mb={3}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box display="flex" height={48}>
                            <Box component={Button} bgcolor="#fff" fontSize={12} color="#333" height="100%" px={lgdevice ? 1 : 3} sx={{border: tab === 'all' ? '1px solid #3d9ae2' : '', fontWeight: tab === 'all' ? 600 : 400}} onClick={() => tabHandler('all')}>All</Box>
                            <Box component={Button} bgcolor="#fff" fontSize={12} color="#333" height="100%" px={lgdevice ? 1 : 3} sx={{border: tab === '1' ? '1px solid #3d9ae2' : '', fontWeight: tab === '1' ? 600 : 400}} onClick={() => tabHandler(1)}>Todos</Box>
                            <Box component={Button} bgcolor="#fff" fontSize={12} color="#333" height="100%" px={lgdevice ? 1 : 3} sx={{border: tab === '2' ? '1px solid #3d9ae2' : '', fontWeight: tab === '2' ? 600 : 400}} onClick={() => tabHandler(2)}>In Progress</Box>
                            <Box component={Button} bgcolor="#fff" fontSize={12} color="#333" height="100%" px={lgdevice ? 1 : 3} sx={{border: tab === '3' ? '1px solid #3d9ae2' : '', fontWeight: tab === '3' ? 600 : 400}} onClick={() => tabHandler(3)}>Completed</Box>
                        </Box>
                        <Box component={Button} minWidth={sxdevice ? 20 : 48} height={sxdevice ? 20 : 48} color="#f5424e" borderRadius={3} border={tab==='trash' ? '1px solid #f5424e' : ''}onClick={() => tabHandler('trash')}><DeleteOutline /></Box>
                    </Box>
                    <Box display="flex" flexDirection={sxdevice ? 'column' : 'row'} alignItems="center" gap={1.5}>
                        <Box sx={{position: 'relative'}}>
                            <Box component={Button} minWidth={48} height={48} bgcolor="#fff" color="#333" borderRadius={3} onClick={() => tasks.set({...tasks.data, date_filter: {...tasks.data.date_filter, toggled: !tasks.data.date_filter.toggled}})}>
                                <Box p="2px 8px" borderRadius={10} fontSize={12}>{moment(tasks.data.date_filter.start).format('MMM DD, YYYY')}</Box>
                                -
                                <Box p="2px 8px" borderRadius={10} fontSize={12}>{moment(tasks.data.date_filter.end).format('MMM DD, YYYY')}</Box>
                                <CalendarMonthOutlined />
                            </Box>
                            <Box sx={{position: 'absolute', bottom: -250, left: 0, zIndex: 1}}>
                                {
                                    tasks.data.date_filter.toggled && (
                                        <DatePicker
                                            onChange={dateFilterHandler}
                                            startDate={tasks.data.date_filter.start}
                                            endDate={tasks.data.date_filter.end}
                                            selectsRange
                                            inline
                                        />
                                    )
                                }
                            </Box>
                        </Box>
                        <TextField variant="outlined" placeholder="I'm looking for. . ." className={classes.search_tf} onInput={searchHandler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" bgcolor="#fff" borderRadius={3} height="100%" sx={{'overflowY': 'auto'}}>
                    <Box display="flex" width="100%" gap={2} px={6} mb={2} pt={3}>
                        <Box fontSize={12} fontWeight={500} width={sxdevice ? '100%' : smdevice ? '85%' : '70%'}>Task</Box>
                        {!sxdevice && <Box fontSize={12} fontWeight={500} width="15%">Date</Box>}
                        {!smdevice && <Box fontSize={12} fontWeight={500} width="15%" textAlign="center">Status</Box>}
                    </Box>
                    <List tab={tab} list={__filter} previewHandler={previewHandler} smdevice={smdevice} sxdevice={sxdevice} />
                </Box>
            </Box>
            <Form form={form} formHandler={formHandler} confirmHandler={confirmHandler} classes={classes} smdevice={smdevice} sxdevice={sxdevice} />
            <Preview tasks={tasks} confirmHandler={confirmHandler} previewHandler={previewHandler} editHandler={editHandler} tab={tab} smdevice={smdevice} sxdevice={sxdevice} />
            <Confirmation form={form} confirmHandler={confirmHandler} submitHandler={submitHandler} updateStatHandler={updateStatHandler} />
        </Container>
    )
}