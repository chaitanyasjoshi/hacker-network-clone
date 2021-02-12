import React, { Component } from 'react';
import { connect } from 'react-redux'
import ButtonCard from './ButtonCard';
import './Pagination.css';
import { userActions} from '../../_actions'

class Pagination extends Component {
	handleClick = (event) => {
		this.props.onButtonClick(parseInt(event.target.value)-1);
		const { query, articleType, timeRange, sort } = this.props.searchSettings;
		this.props.getArticles(query, articleType, timeRange, parseInt(event.target.value)-1, sort);
	}
	handleClickForward = (event) => {
		const { query, articleType, timeRange, sort } = this.props.searchSettings;
		const { page } = this.props.searchResults;
		
		this.props.onButtonClick(page+1);
		this.props.getArticles(query, articleType, timeRange, page+1, sort);
	}
	handleClickBackward = (event) => {
		const { query, articleType, timeRange, sort } = this.props.searchSettings;
		const { page } = this.props.searchResults;
		
		this.props.onButtonClick(page-1);
		this.props.getArticles(query, articleType, timeRange, page-1, sort);
	}

	render() {
		const { page, totalPages } = this.props.searchResults;
		const createPagination = () => {
			let buttons = [];
			const currentIndex = parseInt(page)+1;
			const lastIndex = parseInt(totalPages);
			if ( currentIndex !== 1) {
				buttons.push({
					value: '<i class="icon-rewind"></i>',					
					isActive: false,
					isDisabled: false,
					onClick: this.handleClickBackward
				});
			}

			const low = (currentIndex - 4 > 0) ? 4 : currentIndex - 1;
			const high = (currentIndex + 4 <= lastIndex) ? 4 : lastIndex - currentIndex;
			if (currentIndex-low >= 2){
				buttons.push({
					value: 1,					
					isActive: false,
					isDisabled: false,
					onClick: this.handleClick
				});
				if (currentIndex-low > 2){
					buttons.push({
						value: '<i class="icon-ellipsis"></i>',					
						isActive: false,
						isDisabled: true
					});
				}
			}
			for (var i = low; i > 0; i--) {
				buttons.push({
					value: currentIndex-i,					
					isActive: false,
					isDisabled: false,
					onClick: this.handleClick
				});
			}
			buttons.push({
				value: currentIndex,				
				isActive: true,
				isDisabled: false
			});
			for (i = 0; i < high; i++) {
				buttons.push({
					value: currentIndex+i+1,				
					isActive: false,
					isDisabled: false,
					onClick: this.handleClick
				});
			}
			if (lastIndex - currentIndex >= 5) {
				if (lastIndex - currentIndex > 5) {
					buttons.push({
						value: '<i class="icon-ellipsis"></i>',					
						isActive: false,
						isDisabled: true
					});
				}
				
				buttons.push({
					value: lastIndex,					
					isActive: false,
					isDisabled: false,
					onClick: this.handleClick
				});
			}
			if ( lastIndex !== currentIndex){
				buttons.push({
					value: '<i class="icon-fast-forward"></i>',					
					isActive: false,
					isDisabled: false,
					onClick: this.handleClickForward
				});
			}
			return buttons;
		}
		const PagiN = ({buttons}) => {
		    const pageComponent = buttons.map((button, i) =>
		        <ButtonCard 
		            key={i}
		            value={button.value}
		            isActive={button.isActive}
		            isDisabled={button.isDisabled}
		            onClick={button.onClick}
		        />
		    );
		    return (
		        <ul className="search-pagination">
		        	{pageComponent}
		        </ul>
		    );
		}
		return (
			<PagiN buttons={createPagination()} />
		);
	}
}
function mapStateToProps(state) {
  const { user, searchSettings, searchResults } = state
  return {
  	user,
  	searchResults,
    searchSettings
  }
}
const mapDispatchToProps = dispatch =>{
	return{
		onButtonClick: (page) => dispatch(userActions.changePage(page)),
		getArticles: (query, articleType, timeRange, page, sort) => dispatch(userActions.fetchArticles(query, articleType, timeRange, page, sort))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);