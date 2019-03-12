/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {View,TouchableOpacity,Text,Image,StyleSheet} from 'react-native';

type Props = {};
export default class HealthSightItem extends Component<Props> {
    render() {
        const {item} = this.props;
        if (!item||!item.owner) return null;
        return(
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <Text>Author:</Text>
                        <Image
                            style={{height:22,width:22}}
                            source={{uri:item.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Start:</Text>
                        <Text>{item.stargazers_count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',//IOS添加阴影效果
        shadowOffset:{width: 0.5,height: 0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation: 2,//android添加阴影效果
    },
    row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121',
    },
    description:{
        fontSize: 14,
        marginBottom: 2,
        color:'#212121',
    },
})