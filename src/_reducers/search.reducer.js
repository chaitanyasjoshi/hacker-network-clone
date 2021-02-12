import { userConstants } from '../_constants';

export function searchSettings(state = {
    articleType: 'story',
    timeRange: 'all',
    sort: 'byPopularity',
    query: ''
  }, action) {
    switch (action.type) {
      case userConstants.CHANGE_TIME:
        return Object.assign({}, state, {
          timeRange: action.timeRange
        })
      case userConstants.CHANGE_TYPE:
        return Object.assign({}, state, {
          articleType: action.articleType
        })
      case userConstants.CHANGE_SORT:
        return Object.assign({}, state, {
          sort: action.sort
        })
      case userConstants.CHANGE_SEARCH:
        return Object.assign({}, state, {
          query: action.query
        })
      default:
        return state
    }
  }

export function searchResults(
    state = {
      isFetching: false,
      data: [],
      number: 0,
      timeTaken: 0,
      page: 0,
      totalPages: 0
    }, action) {
    switch (action.type) {
      case userConstants.REQUEST_ARTICLES:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case userConstants.RECEIVE_ARTICLES:
        return Object.assign({}, state, {
          isFetching: false,
          data: action.data.hits,
          timeTaken: action.data.processingTimeMS,
          number: action.data.nbHits,
          totalPages: action.data.nbPages,
          page: action.data.page
        })
      case userConstants.CHANGE_PAGE:
        return Object.assign({}, state, {
          page: action.page,
        })
      default:
        return state
    }
  }