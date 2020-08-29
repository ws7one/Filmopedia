import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as actions from '../redux/actions/home/HomeActions';
import { imageUrl } from '../services/Endpoints';
import theme from '../theme';
import { commonStyle } from './common/styles';
import Ratings from './common/Ratings';

const screenWidth = Dimensions.get('window').width;

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
            this.props.searchMovie(text);
        }
    }

    debouncedChangeText = (text) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.changeMessage(text), this.state.debounce);
    }

    handleTextChange = (text) => {
        this.setState({ undebouncedText: text }, () => this.debouncedChangeText(text));
    }

    renderMovieCard = (item) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => this.props.navigateToDetail(item.id)}
        >
            <Image
                style={styles.imageStyle}
                source={{
                    uri: imageUrl(item.backdrop_path)
                }}
            />
            <View style={styles.detailContainer}>
                <View style={styles.ratingsContainer}>
                    <View style={{ flex: 1 }} />
                    <View
                        style={{
                            flex: 3,
                            paddingVertical: 5,
                            justifyContent: 'flex-end',
                            paddingLeft: 10
                        }}
                    >
                        <Ratings movie={item} />
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 3, paddingVertical: 5, justifyContent: 'center' }}>
                        <Text
                            style={{
                                color: theme.white,
                                fontSize: 20,
                                fontWeight: '600',
                                marginLeft: 10
                            }}
                            numberOfLines={2}
                        >
                            {item.original_title}
                        </Text>
                    </View>
                    <View style={styles.posterContainer}>
                        {item.poster_path ? (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: imageUrl(item.poster_path) }}
                            />
                        ) : (
                                <Text style={commonStyle.infoMessageTextStyle}>
                                    No poster available
                                </Text>
                            )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    render() {
        const {
            searchResult,
            noResultMessage,
            isSearching
        } = this.props.home;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => this.handleTextChange(text)}
                    onBlur={() => clearTimeout(this.timer)}
                    value={this.state.undebouncedText}
                    placeholder='Search'
                />
                {isSearching ? (
                    <View style={commonStyle.noDataContainer}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                        <FlatList
                            data={searchResult}
                            renderItem={({ item }) => this.renderMovieCard(item)}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={commonStyle.noDataContainer}>
                                    <Text style={commonStyle.infoMessageTextStyle}>
                                        {noResultMessage}
                                    </Text>
                                </View>
                            }
                        />
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme.white
    },
    textInputStyle: {
        width: '100%',
        height: 40,
        borderColor: theme.grey3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    cardContainer: {
        width: screenWidth - 20,
        height: (screenWidth - 20) / 1.8,
        borderRadius: 20,
        elevation: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: theme.black,
        shadowOpacity: 0.9,
        marginBottom: 10,
        overflow: 'hidden',
        backgroundColor: theme.black
    },
    imageStyle: { width: '100%', height: '100%' },
    detailContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    ratingsContainer: {
        flex: 7,
        width: '100%',
        flexDirection: 'row'
    },
    titleContainer: {
        flex: 3,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flexDirection: 'row'
    },
    posterContainer: {
        position: 'absolute',
        top: -75,
        left: 10,
        borderWidth: 2,
        borderColor: theme.white,
        borderRadius: 5,
        overflow: 'hidden',
        width: 90,
        height: 135,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.black
    }
});

const mapStateToProps = state => ({
    home: state.homeReducer
});

export default connect(mapStateToProps, actions)(Home);
