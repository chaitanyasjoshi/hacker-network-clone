import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import './Header.css';
import { Container } from '@material-ui/core'
import { userActions } from '../../_actions'

class Header extends Component {

	handleSearchChange = (event) => {
		if (event.keyCode == 13) {
			this.saveToStorage(event);
			this.props.onSearchChange(event);
			this.props.pageChange(0)
			const { articleType, timeRange, sort } = this.props.searchSettings;
			this.props.getArticles(event.target.value, articleType, timeRange, 0, sort);
		}
	};

	saveToStorage (event) {
        let searchKey = event.target.value ? event.target.value : {history: []};
		let timestamp = + new Date();
        localStorage.setItem('search', JSON.stringify(searchKey));
		localStorage.setItem('timestamp', JSON.stringify(timestamp));
	}

	render() {
		const { authentication } = this.props;
		const { user, loggedIn } = authentication;
		const { username } = user;
		return (
			<Container component="header" maxWidth="false">
				<div className="paper">
					<Link className="link" to='/?'>
						<img className="image" src="data:image/png;base64,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" alt='logo'/>
						{(!loggedIn)?
							<div className="SearchHeader_label">
								Search
								<br />
								Hacker News
							</div>
						:
							<div className="SearchHeader_label">
								{ username }
							</div>
						}
					</Link>
					<div className="search-wrapper">
						<div className="input-item-wrapper">
							<i className="icon-search">
							</i>
							<input id="search" onKeyUp={this.handleSearchChange} type="search" placeholder="Search stories by title, url or author" autoComplete="off" autoCapitalize="off" spellCheck="false" autoCorrect="off" autoFocus />
						</div>
					</div>
				</div>
			</Container>
		);
	}
}
function mapStateToProps(state) {
  const { authentication, searchSettings, searchResults } = state;
  return {
  	authentication,
  	searchResults,
    searchSettings
  }
}
const mapDispatchToProps = dispatch =>{
	return{
		onSearchChange: (event) => dispatch(userActions.changeSearch(event.target.value)),
		pageChange: (page) => dispatch(userActions.changePage(page)),
		getArticles: (query, articleType, timeRange, page, sort) => dispatch(userActions.fetchArticles(query, articleType, timeRange, page, sort))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);