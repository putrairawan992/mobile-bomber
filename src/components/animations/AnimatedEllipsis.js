/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import AnimatedEllipsis from 'react-native-animated-ellipsis';



export const Ellipsis = (props) => {
    return (
        <AnimatedEllipsis
            numberOfDots={props.numberOfDots}
            minOpacity={props.minOpacity}
            animationDelay={props.animationDelay}
            style={{
                color: Colors.pink,
                fontSize: 75,
                letterSpacing: -12,
                lineHeight: 30
            }}
        />
    )
}