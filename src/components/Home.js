import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/home/HomeActions';

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.home.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    home: state.homeReducer
});

export default connect(mapStateToProps, actions)(Home);
