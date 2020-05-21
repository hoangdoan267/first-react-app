import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Grid, GridSpacing, Paper } from '@material-ui/core';
import moment from 'moment';
moment.locale();

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default class WeatherApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weatherData: {},
		};
	}

	componentDidMount() {
		this.getWeatherData();
	}

	getWeatherData = async () => {
		try {
			const url =
				'https://api.openweathermap.org/data/2.5/onecall?lat=-21.02851&lon=105.804817&&units=metric&lang=vi&appid=4451f0cc1d6e5960079c7eb4634f7df8';

			const response = await fetch(url);
			const responseJSON = await response.json();
			console.log(responseJSON);
			this.setState({
				weatherData: responseJSON,
			});
		} catch (error) {
			console.log(error);
		}
	};

	renderCurrentWeather = () => {
		if (this.state.weatherData.current) {
			const { current } = this.state.weatherData;
			const imageUrl = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

			return (
				<Grid item xs={12} sm={12}>
					<Paper elevation={1} style={{ padding: 16 }}>
						<Grid container spacing='2'>
							<Grid item sm={3}>
								<img src={imageUrl} style={{ width: '100%' }} />
							</Grid>
							<Grid item sm={9}>
								<Typography variant='subtitle1'>
									{moment.unix(current.dt).format('HH:mm DD/MM/YYYY')}
								</Typography>

								<Typography variant='h3'> {current.temp} C</Typography>
								<Typography
									variant='h5'
									style={{ textTransform: 'capitalize' }}
								>
									{current.weather[0].description}
								</Typography>
								<Typography variant='subtitle2' gutterBottom>
									Cảm giác: {current.feels_like} C
								</Typography>
								<Typography variant='subtitle2' gutterBottom>
									Độ ẩm: {current.humidity}%
								</Typography>
								<Typography variant='subtitle2' gutterBottom>
									Áp suất: {current.pressure} hpa
								</Typography>
								<Typography variant='subtitle2' gutterBottom>
									Tốc độ gió: {current.wind_speed} m/s
								</Typography>
								<Typography variant='subtitle2' gutterBottom>
									Mặt trời mọc: {moment.unix(current.sunrise).format('HH:mm')}
								</Typography>
								<Typography variant='subtitle2' gutterBottom>
									Mặt trời lặn: {moment.unix(current.sunset).format('HH:mm')}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			);
		}
	};

	renderWeatherHourData = () => {
		if (this.state.weatherData.daily) {
			const { daily } = this.state.weatherData;
			return daily.map((el, index) => {
				const imageUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
				return (
					<Grid item xs={6} sm={3}>
						<Paper elevation={1} style={{ padding: 16 }}>
							<Typography variant='subtitle1' style={{ textAlign: 'center' }}>
								{moment.unix(el.dt).format('DD/MM')}
							</Typography>
							<Typography variant='h6' style={{ textAlign: 'center' }}>
								{el.temp.min} - {el.temp.max} C
							</Typography>
							<img src={imageUrl} style={{ width: '100%' }} />
							<Typography
								variant='subtitle1'
								style={{ textAlign: 'center', textTransform: 'capitalize' }}
							>
								{el.weather[0].description}
							</Typography>
						</Paper>
					</Grid>
				);
			});
		}
	};

	render() {
		return (
			<div style={{ flexGrow: 1 }}>
				<AppBar position='statics'>
					<Toolbar>
						<Typography variant='h6'>MindX WeatherApp</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth='md'>
					<Grid container spacing='2' style={{ marginTop: 30 }}>
						{this.renderCurrentWeather()}
						{this.renderWeatherHourData()}
					</Grid>
				</Container>

				{/* {this.renderCurrentWeather()} */}
				{/* <div style={{ display: 'flex', padding: 24, overflowX: 'scroll' }}> */}
				{/* {this.renderWeatherHourData()} */}
				{/* </div> */}
			</div>
		);
	}
}
