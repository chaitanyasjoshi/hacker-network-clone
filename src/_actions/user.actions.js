import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    changeSearch,
    changeSort,
    changeType,
    changeTime,
    changePage,
    fetchArticles
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function changeSearch(query) {
    return {
      type: userConstants.CHANGE_SEARCH,
      query
    }
}
  
function changeSort(sort) {
    return {
      type: userConstants.CHANGE_SORT,
      sort
    }
}
  
function changePage(page) {
    return {
      type: userConstants.CHANGE_PAGE,
      page
    }
}
  
function changeTime(timeRange) {
    return {
      type: userConstants.CHANGE_TIME,
      timeRange
    }
}
  
function changeType(articleType) {
    return {
      type: userConstants.CHANGE_TYPE,
      articleType
    }
}

function requestArticles(query, articleType, timeRange, page, sort) {
    return {
        type: userConstants.REQUEST_ARTICLES,
        query,
        articleType,
        timeRange,
        page,
        sort
    }
}

function receiveArticles(query, articleType, timeRange, page, sort, json) {
    return {
        type: userConstants.RECEIVE_ARTICLES,
        query,
        articleType,
        timeRange,
        page,
        sort,
        data: json,
    }
}

const getLastWeek = () => {
    const today = new Date();
    const last = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return (last.getTime()/1000);
}

const getLastMonth = () => {
    const today = new Date();
    const last = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    return (last.getTime()/1000);
}
const getLast24h = () => {
    const today = new Date();
    const last = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
    return (last.getTime()/1000);
}
const getLastYear = () => {
    const today = new Date();
    const last = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
    return (last.getTime()/1000);
}

function fetchArticles(query, articleType, timeRange, page, sort) {
    return dispatch => {
      
      window.history.pushState(null, null, `/query=${query}/sort=${sort}/page=${page}/dateRange=${timeRange}/type=${articleType}`);
      dispatch(requestArticles(query, articleType, timeRange, page, sort))
      let sort_t, timeRange_t, articleType_t;
  
      switch(sort){
        case 'byPopularity': sort_t = 'search'; break;
        case 'byDate': sort_t = 'search_by_date'; break;
        default: sort_t ='search';
      }
      switch(timeRange){
        case 'all': timeRange_t = null; break;
        case 'last24h': timeRange_t = getLast24h(); break;
        case 'pastWeek': timeRange_t = getLastWeek(); break;
        case 'pastMonth': timeRange_t = getLastMonth(); break;
        case 'pastYear': timeRange_t = getLastYear(); break;
        default: timeRange_t = null;
      }
      switch(articleType){
        case 'story': articleType_t = 'story'; break;
        case 'comment': articleType_t = 'comment'; break;
        case 'all': articleType_t = '(story,comment)'; break;
        default: articleType_t ='story';
      }
      let url;
      if(timeRange_t === null){
        url = `https://hn.algolia.com/api/v1/${sort_t}?query=${query}&page=${page}&tags=${articleType_t}`;
      }
      else {
        url = `https://hn.algolia.com/api/v1/${sort_t}?query=${query}&page=${page}&tags=${articleType_t}&numericFilters=created_at_i>${timeRange_t}`;
      }
      console.log(url);
      return fetch(url)
        .then(res => res.json())
        .then(data => {
          dispatch(receiveArticles(query, articleType, timeRange, page, sort, data))
        })
    }
  }