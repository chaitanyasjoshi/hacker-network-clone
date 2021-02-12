import React, { Component } from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { userActions } from '../../_actions'

class Home extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		let {sort, dateRange, type, page, query} = this.props.match.params;
		this.props.typeChange(type);
		this.props.sortChange(sort);
		this.props.timeChange(dateRange);
		this.props.pageChange(page);
		if(query === undefined || query === null)
			query='';
		else
			this.props.queryChange(query);
		this.props.getArticles(query, type, dateRange, page, sort);
		document.getElementById("search").value = query;
		window.history.pushState(null, null, `/query=${query}/sort=${sort}/page=${page}/dateRange=${dateRange}/type=${type}`);
	}
	render() {
		return (
			<Container component="div" maxWidth="false">
				<Header />
				<Section />
			</Container>
		);
	}
}
function mapStateToProps(state) {
  const { user } = state
  return { user }
}
const mapDispatchToProps = dispatch =>{
	return{
		typeChange: (value) => dispatch(userActions.changeType(value)),
		timeChange: (value) => dispatch(userActions.changeTime(value)),
		sortChange: (value) => dispatch(userActions.changeSort(value)),
		queryChange: (value) => dispatch(userActions.changeSearch(value)),
		pageChange: (value) => dispatch(userActions.changePage(value)),
		getArticles: (query, articleType, timeRange, page, sort) => dispatch(userActions.fetchArticles(query, articleType, timeRange, page, sort))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);