import React, {Component} from 'react';
import {View,TouchableOpacity,Text,Image,StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {};
export default class DoctorCureItem extends Component<Props>{
    constructor(props){
        super(props);
        const {officeName} = this.props;
        this.officeName = officeName;
    }

    render(){
        return(
            <TouchableOpacity style={styles.cell_container} onPress={this.props.onSelect}>
                <View style={{flex:1,flexDirection:'column'}}>
                    <View style={styles.icon_container}>
                        <AntDesign name={'book'} size={26} style={styles.icon}/>
                    </View>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>{this.officeName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cell_container: {
        flex:0.25,
        backgroundColor:'red',
        margin:4,
        // padding: 4,
    },
    icon_container: {
        flex:0.75,
        backgroundColor: 'skyblue',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    title_container:{
        flex:0.25,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    icon:{
        color:'red',
    },
    title: {
        fontSize: 10,
        color: '#212121',
    },
})