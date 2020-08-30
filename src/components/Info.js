import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../theme';

class Info extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Data source</Text>
                <Text>Images source</Text>
                <Text>Search powered by:</Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginBottom: 10
                    }}
                    onPress={() => {
                        Linking.openURL('https://www.themoviedb.org/');
                    }}
                >
                    <Icon name="link-external" type="octicon" color={theme.blue} />
                    <Text
                        style={{
                            color: theme.blue,
                            fontSize: 20,
                            fontWeight: '600',
                            textDecorationLine: 'underline',
                            marginLeft: 5
                        }}
                    >
                        The Movie DB
                    </Text>
                </TouchableOpacity>
                <Text>Developed by:</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Icon name="keyboard" type="octicon" color={theme.black} />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginLeft: 5
                        }}
                    >
                        Philip Viningston
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
