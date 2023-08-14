import { Box, Button, IconButton, InputAdornment, TextField, useMediaQuery } from "@mui/material"
import { MailOutline as IMailOutline, RemoveRedEyeOutlined as IRemoveRedEye , VisibilityOffOutlined as IVisibilityOff} from "@mui/icons-material";
import { avatarstylesx, tfsx } from "../../../core/styles/global";
import { useContext } from "react";
import { AppContext } from "../../../core/contexts/AppContext";
import { useEffect } from "react";
import { TLogo } from "../../../core/Icons";
import { SnakeLoader } from "../../../core/loaders/SnakeLoader";
import { useHistory } from "react-router-dom";
import BG3 from "../../../assets/images/core/bg3.png"

export const Verification = ({ match }) => {
    const { auth_state, app_state } = useContext(AppContext)
    const { __DB, __SESSION, form } = {...auth_state, ...app_state}
    const { type } = {...match.params}
    const smdevice = useMediaQuery('(max-width:780px)');
    console.log(smdevice)
    const history = useHistory()

    useEffect(() => {
        if (type !== 'login' && type !== 'registration') {
            return form.set({...form.data, type: 'malformed'})
        }

        form.set({
            type, submitted: false, inputs: {
                first_name: {value: '', stat: false, msg: '', disabled: false},
                last_name: {value: '', stat: false, msg: '', disabled: false},
                email: {value: '', stat: false, msg: '', disabled: false},
                password: {value: '', stat: false, msg: '', disabled: false},
            }
        })

		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    const redirectHandler = () => {
        history.push(`/auth/${form.data.type === 'login' ? 'registration': 'login'}`)
    }

    const inputHandler = (e) => {
        const {name, value} = e.target
        let inputs = {...form.data.inputs}
        inputs = {...inputs, [name] : {...inputs[name], value, stat: false, msg: ''}}

        form.set({...form.data, err_msg: '', inputs})
    }

    const submitHandler = () => {
        const i = {...form.data.inputs}
        const check = __DB.data.filter((d) => (d.email === i.email.value))
        const ainfo = {
            first_name: i.first_name.value,
            last_name: i.last_name.value,
            email: i.email.value,
            password: i.password.value,
        }
        if (form.data.type === 'login') {
            if (check.length === 0) return form.set({...form.data, err_msg: 'Email or password does not match. Please try again.'})
            if(check[0].password !== i.password.value) return form.set({...form.data, err_msg: 'Email or password does not match. Please try again.'})
        }
        if (form.data.type === 'registration') {
            if (check.length > 0) return form.set({...form.data, err_msg: 'Email already exist. Please try new email.'})
            localStorage.setItem('tdl_app_db', JSON.stringify([...__DB.data, ainfo]))
        }

        localStorage.setItem('tdl_app_session', JSON.stringify(ainfo))
        history.push('/tasks/all')
        __SESSION.set(ainfo)
    }

    return form.data.type !== null ? (
        form.data.type !== 'malformed' ? (
            <Box width="100%" height="100%">
                <Box display="flex" width="100%" height="100%" borderRadius={4}>
                    <Box width={smdevice ? '100%' : '50%'} display="flex" alignItems="center" justifyContent="center" bgcolor="#fff" p={5}>
                        <Box width={320}>
                            <Box fontSize={20} fontWeight={800} color="#3d9ae2">{form.data.type === 'login' ? 'Welcome back' : 'Register Account'}</Box>
                            <Box fontSize={12} fontWeight={500} color="#333">Please {form.data.type === 'login' ? 'log in' : 'register'} to continue using our app.</Box>
                            <Box fontSize={12} height={18} mt={2} color="#f5424e">{form.data.err_msg}</Box>
                            <Box display="flex" flexDirection="column" gap={3} mt={1.5}>
                                {
                                    form.data.type === 'registration' && (
                                        <Box display="flex" flexDirection="column" gap={3}>
                                            <TextField label="Firstname" variant="outlined" name="first_name" fullWidth sx={tfsx()} onInput={inputHandler}
                                                value={form.data.inputs.first_name.value} error={form.data.inputs.first_name.stat} helperText={form.data.inputs.first_name.msg}
                                            />
                                            <TextField label="Lastname" variant="outlined" name="last_name" fullWidth sx={tfsx()} onInput={inputHandler}
                                                value={form.data.inputs.last_name.value} error={form.data.inputs.last_name.stat} helperText={form.data.inputs.last_name.msg}
                                            />
                                        </Box>
                                    )
                                }
                                <TextField label="Email" variant="outlined" name="email" fullWidth sx={tfsx()} onInput={inputHandler}
                                    value={form.data.inputs.email.value} error={form.data.inputs.email.stat} helperText={form.data.inputs.email.msg}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{pr: 1}}>
                                                <IMailOutline />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField label="Password" type={form.data.inputs.password.show ? 'text' : 'password'} variant="outlined" name="password" fullWidth sx={tfsx()} onInput={inputHandler}
                                    value={form.data.inputs.password.value} error={form.data.inputs.password.stat} helperText={form.data.inputs.password.msg}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => form.set({...form.data, inputs: {...form.data.inputs, password: {...form.data.inputs.password, show: !form.data.inputs.password.show}}})}>
                                                    {form.data.inputs.password.show ? <IRemoveRedEye /> : <IVisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Box component={Button} onClick={submitHandler} bgcolor="#3d9ae2" borderRadius={2} color="#fff" sx={{':hover': {bgcolor: "#3d9ae2"}}}
                                    disabled={form.data.type==='registration' && (form.data.inputs.first_name.value === '' || form.data.inputs.last_name.value === '' || form.data.inputs.email.value === '' || form.data.inputs.password.value === '') }
                                >
                                    { form.data.type === 'login' ? 'Login' : 'Register' }
                                    </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" gap={1} mt={5} fontSize={13}>
                                <Box>{form.data.type === 'login' ? `Don't` : 'Already'} have an account? </Box> <Box color="#3d9ae2" sx={{cursor: 'pointer'}} onClick={redirectHandler}>{form.data.type === 'login' ?'Register' : 'Login'}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box width="50%" bgcolor="#e3f3ff" display={smdevice ? 'none' : 'block'}>
                        <Box display="flex" justifyContent="flex-end" sx={avatarstylesx(BG3, '100%', `100%`, 0, '80%', 'bottom right')}>
                            <Box display="flex" justifyContent="flex-end" width="80%" py={10} pr={5}>
                                <Box fontSize={14} fontWeight={600}>Organize, prioritize, and collaborate seamlessly on tasks to boost efficiency and achieve your goals.</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box>Malformed Request</Box>
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