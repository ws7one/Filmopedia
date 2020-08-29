import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../../theme';

const Ratings = ({ movie }) => {
    const rating = movie.vote_average / 2;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {[...new Array(5).keys()].map(number => (
                <Icon
                    key={`star${number}`}
                    name={
                        rating > (number + 0.75)
                            ? 'star'
                            : rating > (number + 0.25)
                                && rating < (number + 0.75)
                                ? 'star-half' : 'star-border'
                    }
                    size={24}
                    color={theme.gold}
                />
            ))}
            <Text style={{ color: theme.white }}>({movie.vote_count})</Text>
        </View>
    );
};

export default Ratings;
