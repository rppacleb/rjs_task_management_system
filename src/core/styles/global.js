import { makeStyles } from '@mui/styles'

export const avatarstyle = (bg, w=30, h=30, radius="10%") => {
    let s = makeStyles(theme => ({
        avatar: {
            // border: '3px solid #fff',
            background: `url(${bg})`,
            borderRadius: '10%',
            backgroundColor: '#fff',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            width: w,
            maxWidth: w,
            minWidth: w,
            height: h,
            maxHeight: h,
            minHeight: h,
        },
    }))

    return s().avatar
}

export const avatarstylesx = (bg, w=30, h=30, radius="10%", size="cover", position="center center") => {
    return {
        // border: '3px solid #fff',
        background: `url(${bg})`,
        borderRadius: radius,
        // backgroundColor: '#fff',
        backgroundSize: size,
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        width: w,
        maxWidth: w,
        minWidth: w,
        height: h,
        maxHeight: h,
        minHeight: h,
    }
}

export const tf = (v) => {
    let s = makeStyles(theme => ({
        search_tf: {
            fontSize: '10px',
            border: '0px solid transparent',
            '& fieldset': { 
                border: 'none',
            },
            '& label.Mui-focused': {
                color: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                border: '0px solid transparent',
                backgroundColor: '#D3E7F6',
                width: '300px',
                height: '48px !important',
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                },
            }
        },
        wst_tf: {
            fontSize: '10px',
            border: '0px solid transparent',
            '& fieldset': { 
                border: 'none',
            },
            '& label.Mui-focused': {
                color: theme.palette.primary.main,
            },
            '& label[data-shrink=false].MuiInputLabel-root': {
                marginTop: -3.8,
            },
            '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                bgcolor: '#fff',
                height: 45,
                backgroundColor: '#D3E7F6',
                borderRadius: 10
            }
        },
        tf: {
            fontSize: '10px',
            '& label.Mui-focused': {
                color: '#313131',
            },
            '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                bgcolor: '#fff',
                '& fieldset': {
                    // borderColor: v !== '' ? '#256EFF' : '#E6E6E6',
                },
                '&:hover fieldset': {
                    borderColor: '#256EFF',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#256EFF',
                },
            }
        }
    }))

    return s()
}

export const tfsx = (v="tf") => {
    return {
        fontSize: '10px',
        '& label.Mui-focused': {
            color: '#313131',
            fontSize: 14
        },
        '& label[data-shrink=false].MuiInputLabel-root': {
            marginTop: -0.4,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            bgcolor: '#fff',
            height: v === 'tf' ? '45px' : 'auto',
            borderRadius: 2
            // '& fieldset': {
            //     borderColor: '#D7DDDF',
            // },
            // '&:hover fieldset': {
            //     borderColor: '#00B451',
            // },
            // '&.Mui-focused fieldset': {
            //     borderColor: '#00B451',
            // },
        }
    }
}