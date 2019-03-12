import Types from '../../actions/types'

const defaultState = {};
/**
 * state树
 * state:{
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
        case Types.HEALTHSIGHT_LOAD_SUCCESSFUL:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
                    items:action.items,
                    isLoading:false,
                }
            };
        case Types.HEALTHSIGHT_REFRESH:
            return{
                ...state,
                [action.diseaseSortName]:{
                    ...state[action.diseaseSortName],
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
        default:
            return state;
    }
}