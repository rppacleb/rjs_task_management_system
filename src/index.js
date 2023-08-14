import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { AppProvider } from './core/contexts/AppContext';
import { App } from './App'; 
import ReactDOM from 'react-dom';
import './assets/css/global.css';

const pageTheme = createTheme({
    palette: {
        background: {
            default: '#f6fbff'
        }
    },
    typography: {
		button: {
			textTransform: 'none'
		},
		fontFamily: [
		  '-apple-system',
		  '"Inter"',
		].join(','),
	},
});

ReactDOM.render(<ThemeProvider theme= { pageTheme }><CssBaseline /><AppProvider><App /></AppProvider></ThemeProvider>, document.getElementById('root'));