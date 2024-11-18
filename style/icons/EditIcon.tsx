/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon, IconProps} from '@ui-kitten/components';

export default function EditIcon({fill}: IconProps) {
  return (
    <Icon name="edit-outline" fill={fill} style={{width: 24, height: 24}} />
  );
}
