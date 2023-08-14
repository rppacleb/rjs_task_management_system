import { Box, Typography } from "@mui/material"
import { TLogo } from "../../core/Icons"
import { SnakeLoader } from "../../core/loaders/SnakeLoader"
import moment from "moment"

export const ActiveList = ({ tab, list, previewHandler, smdevice, sxdevice }) => {
    return list !== null ? (
        list.length > 0 ? (
            <Box display="flex" flexDirection="column" gap={1.5} sx={{'overflowY': 'auto'}} px={3} pb={3}>
                {
                    list.map((l, k) => (
                        <Box key={k} display="flex" alignItems="center" border={`1px solid ${tab === 'trash' ? '#f5424e' : '#c4dff2'}`} px={3} py={1} gap={2} borderRadius={3} sx={{cursor: 'pointer', ':hover':{ bgcolor: '#EFF3F3'}}}
                            onClick={() => previewHandler(true, l)}
                        >
                            <Box width={sxdevice ? '100%' : smdevice ? '85%' : '70%'} fontSize={14} fontWeight={600} sx={{overflowX: 'hidden'}}>
                                <Box display="flex" alignItems="center" gap={1} width="100%">
                                    <Box maxWidth={sxdevice ? '100%' : '55%'} width={sxdevice ? '100%' : '55%'}>
                                        <Box component={Typography} noWrap fontSize={12} fontWeight={400}>
                                            {l.title}
                                        </Box>
                                        <Box component={Typography} noWrap fontSize={14} fontWeight={600}>
                                            {l.task}
                                        </Box>
                                    </Box>
                                    {
                                       (!sxdevice && l.subtask.length > 0 )&& (
                                            <Box bgcolor="#d3e7f6" borderRadius={3} p="4px 16px" fontSize={12} fontWeight={400}>
                                                {l.subtask.length} Sub-tasks
                                            </Box>
                                        )
                                    }
                                    {
                                        (!sxdevice && l.files.length > 0) && (
                                            <Box bgcolor="#d3e7f6" borderRadius={3} p="4px 16px" fontSize={12} fontWeight={400}>
                                                {l.files.length} Files attached
                                            </Box>
                                        )
                                    }
                                </Box>
                            </Box>
                            {
                                !sxdevice && (
                                    <Box width="15%" fontSize={14} fontWeight={600}>{moment(l.date).format('MMMM DD, YYYY')}</Box>
                                )
                            }
                            {
                                !smdevice && (
                                    <Box width="15%" fontSize={14} fontWeight={600} display="flex" justifyContent="center">
                                        <Box component={Typography} p="4px 16px" borderRadius={5} fontSize={14} noWrap 
                                            bgcolor={l.status === 1 ? '#DEEBFF' : l.status === 2 ? '#E8F5E9' : '#008F5D'} 
                                            color={l.status === 1 ? '#0052CC' : l.status === 2 ? '#008F5D' : '#fff'}
                                        >
                                            {l.status === 1 ? 'Todo' : l.status === 2 ? 'In Progress' : 'Completed'}
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                    ))
                }
            </Box>
        ) : (
            <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                No Task found.
            </Box>
        )
    ) : (
        <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <TLogo width={60} height={60} />
            <Box mt={4}>
                <SnakeLoader size={10} bg="#3d9ae2" distance="4px" />
            </Box>
        </Box>
    )
}