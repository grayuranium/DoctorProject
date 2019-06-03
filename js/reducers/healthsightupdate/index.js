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
        case Types.HEALTHSIGHTUPDATE_LOAD_SUCCESSFUL:
            return{
                ...state,
                [action.doctorid]:{
                    ...state[action.doctorid],
                    items:action.items,
                    projectModes:action.projectModes,
                    isLoading:false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                }
            };
        case Types.HEALTHSIGHTUPDATE_REFRESH:
            return{
                ...state,
                [action.doctorid]:{
                    ...state[action.doctorid],
                    hideLoadingMore:false,
                    isLoading:true,
                }
            };
        case Types.HEALTHSIGHTUPDATE_LOAD_FAILED:
            return{
                ...state,
                [action.doctorid]:{
                    ...state[action.doctorid],
                    error:action.error,
                    isLoading:false,
                }
            };
        case Types.HEALTHSIGHTUPDATE_LOAD_MORE_SUCCESSFUL:
            return{
                ...state,
                [action.doctorid]:{
                    ...state[action.doctorid],
                    projectModes:action.projectModes,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                }
            };
        case Types.HEALTHSIGHTUPDATE_LOAD_MORE_FAILED:
            return{
                ...state,
                [action.doctorid]:{
                    ...state[action.doctorid],
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex,
                }
            }
        default:
            return state;
    }
}