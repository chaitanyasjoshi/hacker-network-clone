import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Pagination from '../Pagination/Pagination';
import MainHeader from '../MainHeader/MainHeader';
import './Section.css';
import { Container } from '@material-ui/core'

class Section extends Component {

	render() {
		return (
			<Container component="header" maxWidth="lg">
				<MainHeader />
				<SearchResults />
				<Pagination />
			</Container>
		);
	}
}

export default Section;