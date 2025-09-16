import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { Mixin } from '../../helpers';
import { theme } from '../../utils/styles/theme';

const styles = StyleSheet.create({
  container: {
    color: '#05253D',
  },
  white: {
    color: 'white',
  },
  h1: {
    fontWeight: '300',
    fontSize: 40,
  },
  h2: {
    fontWeight: '700',
    fontSize: 20,
  },
  h3: {
    fontWeight: '600',
    fontSize: 18,
  },
  h4: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  h5: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  h6: {
    fontWeight: '600',
    fontSize: 16,
  },
  subtitle1: {
    fontWeight: '400',
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle3: {
    fontWeight: '600',
    fontSize: 14,
  },
  body1: {
    fontWeight: '600',
    fontSize: 16,
  },
  body2: {
    fontWeight: '500',
    fontSize: 12,
  },
  body3: {
    fontWeight: '200',
    fontSize: 16,
  },
  button: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  caption: {
    fontWeight: '600',
    fontSize: 12,
  },
  overline: {
    textDecorationLine: 'underline'
  },
  italic: {
    fontStyle: 'italic',
  },
  primary: {
    color: theme.colors.primary,
  }
});
const AppText = (props) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    body3,
    subtitle1,
    subtitle2,
    subtitle3,
    caption,
    button,
    overline,
    primary
  } = props;
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        styles.container,
        h1 ? styles.h1 : null,
        h2 ? styles.h2 : null,
        h3 ? styles.h3 : null,
        h4 ? styles.h4 : null,
        h5 ? styles.h5 : null,
        h6 ? styles.h6 : null,
        subtitle1 ? styles.subtitle1 : null,
        subtitle2 ? styles.subtitle2 : null,
        subtitle3 ? styles.subtitle3 : null,
        body1 ? styles.body1 : null,
        body2 ? styles.body2 : null,
        body3 ? styles.body3 : null,
        button ? styles.button : null,
        caption ? styles.caption : null,
        overline ? styles.overline : null,
        props.white ? styles.white : null,
        props.italic ? styles.italic : null,
        primary ? styles.primary : null,
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
export default AppText;
