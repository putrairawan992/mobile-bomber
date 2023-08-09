import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const DragHand = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" width={props.size} height={props.size}>
      <G fill={props.color} fillRule="evenodd" clipRule="evenodd">
        <Path d="M15.833 5.982c.345 0 .625.28.625.625v7.143c0 1.178-.38 2.183-1.103 2.894-.722.709-1.724 1.065-2.855 1.065H8.649a2.29 2.29 0 01-1.689-.744l-3.153-3.44a2.292 2.292 0 01-.144-2.923l1.67-2.227a.625.625 0 111 .75l-1.67 2.227c-.3.401-.273.96.066 1.329l3.153 3.44c.197.215.475.338.767.338h3.85c.87 0 1.535-.27 1.98-.707.443-.435.73-1.097.73-2.002V6.607c0-.345.28-.625.624-.625z" />
        <Path d="M14.17 5.973c-.106.107-.212.3-.212.633v.476a.626.626 0 01-1.25 0v-.476c0-.619.207-1.14.57-1.51a1.827 1.827 0 011.305-.543c.47 0 .947.18 1.305.543.364.37.57.891.57 1.51a.625.625 0 01-1.25 0c0-.333-.106-.526-.21-.633a.577.577 0 00-.415-.17.577.577 0 00-.414.17z" />
        <Path d="M11.67 5.223c-.106.107-.212.3-.212.633v1.228h-1.25V5.417h.037-.037c0-.152.055-.292.146-.401.097-.257.24-.483.425-.67a1.827 1.827 0 011.304-.543c.47 0 .947.18 1.305.543.364.37.57.891.57 1.51v1.227a.626.626 0 01-1.25 0V5.857c0-.333-.106-.526-.21-.633a.577.577 0 00-.415-.17.577.577 0 00-.414.17zm-.837 1.86h-.625a.625.625 0 101.25 0h-.625z" />
        <Path d="M11.67 5.223c-.106.107-.212.3-.212.633v1.228h-1.25V5.856c0-.619.207-1.14.57-1.51a1.827 1.827 0 011.305-.543c.47 0 .947.18 1.305.543.364.37.57.891.57 1.51v1.227a.626.626 0 01-1.25 0V5.857c0-.333-.106-.526-.21-.633a.577.577 0 00-.415-.17.577.577 0 00-.414.17zm-.837 2.486a.625.625 0 01-.625-.625h1.25c0 .345-.28.625-.625.625z" />
        <Path d="M9.17 4.784c-.106.107-.212.3-.212.633v1.666h-1.25V5.418c0-.619.207-1.14.57-1.51a1.827 1.827 0 011.305-.544c.47 0 .947.18 1.305.544.364.37.57.891.57 1.51v1.666h-1.25V5.418c0-.334-.106-.526-.21-.633a.577.577 0 00-.415-.17.577.577 0 00-.414.17zm-.837 2.925a.625.625 0 01-.625-.625h.625l.625-.001c0 .345-.28.626-.625.626zm2.5 0a.625.625 0 01-.625-.625h1.25c0 .345-.28.625-.625.625z" />
        <Path d="M7.083 4.791a.625.625 0 00-.625.625v5.833a.625.625 0 11-1.25 0V5.416c0-1.036.84-1.875 1.875-1.875.967 0 1.875.678 1.875 1.778v1.763h-1.25V5.32c0-.28-.211-.528-.625-.528zm1.25 2.292h-.625a.625.625 0 101.25 0h-.625z" />
      </G>
    </Svg>
  );
};
