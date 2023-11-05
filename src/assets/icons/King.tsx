import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused?: boolean;
}

export const King = (props: Props) => {
  return (
    <Svg fill="none" viewBox="0 0 20 18" width={props.size} height={props.size}>
      <Path
        fill={props.color}
        d="M10.897 3.906a1.818 1.818 0 10-1.79.001l-.01.017c-.595 1.243-1.423 3.023-2.7 3.69-1.05.549-2.555.273-3.673.068a1.364 1.364 0 10-1.611 1.436l2.68 6.919a2.728 2.728 0 002.543 1.742h7.328a2.727 2.727 0 002.543-1.742l2.679-6.919a1.364 1.364 0 10-1.607-1.476c-1.144.148-2.62.337-3.676-.215-1.252-.654-2.091-2.311-2.706-3.521z"
      />
    </Svg>
  );
};
