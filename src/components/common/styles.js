import { StyleSheet } from 'react-native';
import theme from './../../theme';

export const commonStyle = StyleSheet.create({
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    infoMessageTextStyle: {
        fontSize: 11,
        fontStyle: 'italic',
        color: theme.grey3
    },
});
