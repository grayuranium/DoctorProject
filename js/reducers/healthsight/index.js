import Types from '../../actions/types'

const defaultState = {};
/**
 * state树
 * healthsight_state:{
 *     java:{
 *         item:[],
 *         projectModes:[],
 *         isloading:false,
 *     },
 *     python:{
 *         item:[],
 *         projectModes:[],
 *         isloading:true,
 *     },
 * }
 * @param state
 * @param action
 * @returns {{}}
 */
export default function (state = defaultState,action) {
    switch (action.type) {
        case Types.HEALTHSIGHT_LOAD_SUCCESSFUL:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
                    items:action.items,
                    projectModes:action.projectModes,
                    isLoading:false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                }
            };
        case Types.HEALTHSIGHT_REFRESH:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
                    hideLoadingMore:true,
                    isLoading:true,
                }
            };
        case Types.HEALTHSIGHT_LOAD_FAILED:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
                    error:action.error,
                    isLoading:false,
                }
            };
        case Types.HEALTHSIGHT_LOAD_MORE_SUCCESSFUL:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
                    projectModes:action.projectModes,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                }
            };
        case Types.HEALTHSIGHT_LOAD_MORE_FAILED:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex,
                }
            }
        default:
            return state;
    }
}