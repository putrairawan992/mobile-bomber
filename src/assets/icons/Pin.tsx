import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
  style?: any;
}

export const Pin = (props: Props) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 16 17"
      width={props.size}
      height={props.size}
      style={props.style}>
      <G fill={props.color} clipPath="url(#clip0_1018_11053)">
        <Path
          fillRule="evenodd"
          d="M8 2.832a4.833 4.833 0 00-4.833 4.833c0 .605.28 1.381.769 2.248.48.853 1.127 1.736 1.784 2.54A34.31 34.31 0 008 14.966a34.306 34.306 0 002.28-2.512c.656-.804 1.304-1.687 1.784-2.54.488-.867.77-1.643.77-2.248A4.833 4.833 0 008 2.832zm0 12.833l-.344.363-.005-.004-.012-.012-.046-.045a34.105 34.105 0 01-.786-.791 35.307 35.307 0 01-1.861-2.09c-.676-.827-1.362-1.76-1.882-2.683-.512-.91-.897-1.87-.897-2.738a5.833 5.833 0 0111.666 0c0 .868-.386 1.829-.898 2.738-.519.923-1.205 1.856-1.881 2.683a35.325 35.325 0 01-2.647 2.881l-.046.045-.013.012-.003.003s-.001.001-.345-.362zm0 0l.344.363-.344.326-.344-.326.344-.363z"
          clipRule="evenodd"
        />
        <Path d="M8 8.331a.667.667 0 100-1.333.667.667 0 000 1.333z" />
        <Path
          fillRule="evenodd"
          d="M8 7.498a.167.167 0 100 .333.167.167 0 000-.333zm-1.167.167a1.167 1.167 0 112.334 0 1.167 1.167 0 01-2.333 0z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1018_11053">
          <Path fill="#fff" d="M0 0H16V16H0z" transform="translate(0 .998)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
