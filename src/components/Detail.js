import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import moment from 'moment-timezone';
import * as actions from '../redux/actions/detail/DetailActions';
import theme from '../theme';
import { imageUrl } from '../services/Endpoints';
import { commonStyle } from './common/styles';
import Ratings from './common/Ratings';
import NavigationService from '../NavigationService';

const screenWidth = Dimensions.get('window').width;

const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

class Detail extends Component {
    componentDidMount() {
        this.props.getMovieDetails();
    }

    render() {
        const {
            movieData,
            isLoading
        } = this.props.detail;
        if (movieData) {
            const {
                backdrop_path: backdropPath,
                original_title: title,
                tagline,
                poster_path: poster,
                runtime,
                genres,
                overview,
                budget,
                revenue,
                release_date: releaseDate
            } = movieData;
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <View>
                        <View style={{ width: screenWidth, height: screenWidth / 1.8 }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: imageUrl(backdropPath) }}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    borderRadius: 5
                                }}
                                onPress={() => NavigationService.back()}
                            >
                                <Icon name="arrow-back" color={theme.white} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 10 }}>
                            <View style={styles.posterContainer}>
                                {poster ? (
                                    <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={{ uri: imageUrl(poster) }}
                                    />
                                ) : (
                                        <Text style={commonStyle.infoMessageTextStyle}>
                                            No poster available
                                        </Text>
                                    )}
                            </View>
                        </View>
                        <View style={{ flex: 1.5, paddingVertical: 10, paddingLeft: 10 }}>
                            <Text
                                style={{
                                    color: theme.white,
                                    fontSize: 25,
                                    fontWeight: '600',
                                    marginBottom: tagline ? 0 : 10
                                }}
                                numberOfLines={2}
                            >
                                {title}
                            </Text>
                            {tagline ? (<Text
                                style={{
                                    color: theme.white,
                                    fontSize: 12,
                                    marginBottom: 10
                                }}
                                numberOfLines={2}
                            >
                                {tagline}
                            </Text>) : null}
                            <Ratings movie={movieData} />
                            {runtime && (
                                <View
                                    style={{
                                        flexDirection: 'row', marginTop: 10, alignItems: 'center'
                                    }}
                                >
                                    <Icon
                                        name="movie-roll"
                                        type="material-community"
                                        color={theme.white}
                                        size={24}
                                    />
                                    <Text
                                        style={{ color: theme.white, fontSize: 16, marginLeft: 5 }}
                                    >
                                        {(runtime / 60).toFixed(0)}hr {(runtime % 60)}mins
                                </Text>
                                </View>
                            )}

                        </View>
                    </View>
                    {releaseDate && (
                        <Text
                            style={{
                                color: theme.white,
                                fontSize: 16,
                                marginTop: 10,
                                marginHorizontal: 10,
                            }}
                        >
                            Released on <Text style={{ fontWeight: '600' }}>
                                {moment(releaseDate).format('LL')}
                            </Text>
                        </Text>
                    )}
                    {genres.length && (
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginTop: 10,
                                alignItems: 'center',
                            }}
                        >
                            {
                                genres.map(genre => (
                                    <Text
                                        key={genre.id}
                                        style={{
                                            paddingVertical: 5,
                                            paddingHorizontal: 10,
                                            borderRadius: 12,
                                            overflow: 'hidden',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            color: theme.white,
                                            marginRight: 5
                                        }}
                                    >
                                        {genre.name}
                                    </Text>
                                ))
                            }
                        </View>
                    )}
                    <View style={{ padding: 10 }}>
                        <Text style={styles.overviewStyle}>
                            {overview}
                        </Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={styles.detailStyle}>
                            Budget: <Text style={{ fontWeight: '600' }}>
                                {currencyFormat.format(budget)}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={styles.detailStyle}>
                            Revenue: <Text style={{ fontWeight: '600' }}>
                                {currencyFormat.format(revenue)}
                            </Text>
                        </Text>
                    </View>
                </SafeAreaView >
            );
        }

        return (
            <View style={[commonStyle.noDataContainer, { backgroundColor: theme.black }]}>
                {isLoading
                    ? <ActivityIndicator size="large" color={theme.white} />
                    : (
                        <Text>
                            Something went wrong
                        </Text>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.black
    },
    posterContainer: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: theme.white,
        borderRadius: 5,
        overflow: 'hidden',
        width: 150,
        height: 225,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.black
    },
    overviewStyle: {
        color: theme.white,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'justify'
    },
    detailStyle: {
        color: theme.white,
        fontSize: 14
    }
});

const mapStateToProps = state => ({
    detail: state.detailReducer
});

export default connect(mapStateToProps, actions)(Detail);
