import React, { Component } from 'react';
import { ItemCard } from '../ItemCard/ItemCard';
import { connect } from 'react-redux'

class SearchResults extends Component {

	render() {
		const { data, articleType } = this.props;
		const ItemList = ({ results }) => {
			const repComponent = results.map((res, i) => {
				return <ItemCard 
					key={i}
					id={res.objectID} 
					title={res.title}
					url={res.url}
					author = {res.author}
					points={res.points}
					date={res.created_at_i} 
					comment={res.comment_text}
					commentTitle={res.story_title}
					commentNum={res.num_comments}
					storyText={res.story_text}
					type={articleType}
		 		/> 
			});
			return repComponent;
		}
		return (
			<section>
				<ItemList results={ data } />
			</section>
		);
	}
}
function mapStateToProps(state) {
  const { searchSettings, searchResults } = state
  const { data } = searchResults;
  const { articleType } = searchSettings;
  return {
  	data,
    articleType
  }
}

export default connect(mapStateToProps)(SearchResults);