import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/home/HomeActions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debounce: 500,
            undebouncedText: '',
            minSearchTextLength: 3
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    changeMessage = (text) => {
        if (text.length > this.state.minSearchTextLength) {
            this.props.changeMessage(text);
        }
    }

    debouncedChangeText = (text) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.changeMessage(text), this.state.debounce);
    }

    handleTextChange = (text) => {
        this.setState({ undebouncedText: text }, () => this.debouncedChangeText(text));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.home.message}</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => this.handleTextChange(text)}
                    onBlur={() => clearTimeout(this.timer)}
                    value={this.state.undebouncedText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    textInputStyle: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    }
});

const mapStateToProps = state => ({
    home: state.homeReducer
});

export default connect(mapStateToProps, actions)(Home);
