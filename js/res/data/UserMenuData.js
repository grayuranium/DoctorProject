import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/**
 * 用户菜单数据
 * @type {{Related_Website: {name: string, icon: string, Icons}, Connect_Withus: {name: string, icon: string, Icons}, User_Information: {name: string, icon: string, Icons}, Version_Update: {name: string, icon: string, Icons}, About_Author: {name: string, icon: string, Icons}, Style_Change: {name: string, icon: string, Icons}}}
 */
export const USER_MENU = {
    User_Information:{name:'用户信息',Icons:AntDesign, icon:'user',},
    Style_Change:{name:'改变风格',Icons:FontAwesome, icon:'exchange',},
    Related_Website:{name:'最新活动',Icons:MaterialIcons, icon:'whatshot',},
    Version_Update:{name:'版本更新',Icons:MaterialIcons, icon:'system-update-alt',},
    About_Author:{name:'关于作者',Icons:Octicons, icon:'smiley',},
    Connect_Withus:{name:'联系我们',Icons:FontAwesome, icon:'connectdevelop',},
}

/**
 * 用户子菜单数据
 * @type {{User_Information: *[], Style_Change: Array}}
 */
export const USER_CHILD_MENU = {
    User_Information:[{name:'用户名',}, {name:'年龄',}, {name:'性别',}, {name:'手机号',},],
    Style_Change:[],
}