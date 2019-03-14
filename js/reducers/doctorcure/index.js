import Types from '../../actions/types'

const defaultState = {};
/**
 * state树
 * doctorcure_state:{
 *     java:{
 *         item:[],
 *         isloading:false,
 *     },
 *     python:{
 *         item:[],
 *         isloading:true,
 *     },
 * }
 * @param state
 * @param action
 * @returns {{}}
 */
export default function (state = defaultState,action) {
    switch (action.type) {
        case Types.DOCTORCURE_LIST_LOAD_SUCCESSFUL:
            return{
                ...state,
                [action.officeName]:{
                    ...state[action.officeName],
                    items:action.items,
                    projectModes:action.projectModes,
                    isLoading:false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                }
            };
        case Types.DOCTORCURE_LIST_REFRESH:
            return{
                ...state,
                [action.officeName]:{
                    ...state[action.officeName],
                    hideLoadingMore:true,
                    isLoading:true,
                }
            };
        case Types.DOCTORCURE_LIST_LOAD_FAILED:
            return{
                ...state,
                [action.officeName]:{
                    ...state[action.officeName],
                    error:action.error,
                    isLoading:false,
                }
            };
        case Types.DOCTORCURE_LIST_LOAD_MORE_SUCCESSFUL:
            return{
                ...state,
                [action.officeName]:{
                    ...state[action.officeName],
                    projectModes:action.projectModes,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                }
            };
        case Types.DOCTORCURE_LIST_LOAD_MORE_FAILED:
            return{
                ...state,
                [action.officeName]:{
                    ...state[action.officeName],
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex,
                }
            }
        default:
            return state;
    }
}