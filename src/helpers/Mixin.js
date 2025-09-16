import {Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
export const device_height = Dimensions.get('window').height;
export const device_width = Dimensions.get('window').width;
export function moderateSize(size, factor) {
  return moderateScale(size, factor);
}
function dimensions(
  top,
  right = top,
  bottom = top,
  left = right,
  property,
) {
  let styles = {};

  styles[`${property}Top`] = moderateSize(top);
  styles[`${property}Right`] = moderateSize(right);
  styles[`${property}Bottom`] = moderateSize(bottom);
  styles[`${property}Left`] = moderateSize(left);

  return styles;
}
export function margin(top, right = top, bottom = top, left = top) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right = top, bottom = top, left = top) {
  return dimensions(top, right, bottom, left, 'padding');
}
