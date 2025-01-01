// import * as React from "react";
// import { View } from "react-native";
// import { interpolate } from "react-native-reanimated";
// import Carousel, { TAnimationStyle, CarouselRenderItem } from "react-native-reanimated-carousel";

// interface CustomCarouselProps<T> {
//   data: T[];
//   renderItem: CarouselRenderItem<T>;
//   animationStyle?: (value: number) => any;
//   itemSize: number;
//   pageWidth: number;
//   containerStyle?: any;
//   loop?: boolean;
//   onScroll?: (index: number) => void;
// }

// const CustomCarousel = <T,>({
//   data,
//   renderItem,
//   animationStyle,
//   itemSize,
//   pageWidth,
//   containerStyle,
//   loop = true,
//   onScroll,
// }: CustomCarouselProps<T>) => {
//   // Calculate the center offset based on page width and item size
//   const centerOffset = (pageWidth - itemSize) / 2;

//   // Default animation style
//   const defaultAnimationStyle: TAnimationStyle = React.useCallback(
//     (value) => {
//       "worklet";

//       const itemGap = interpolate(
//         value,
//         [-3, -2, -1, 0, 1, 2, 3],
//         [-30, -15, 0, 0, 0, 15, 30]
//       );

//       const translateX =
//         interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
//         centerOffset - itemGap;

//       const translateY = interpolate(
//         value,
//         [-1, -0.5, 0, 0.5, 1],
//         [60, 45, 40, 45, 60]
//       );

//       const scale = interpolate(
//         value,
//         [-1, -0.5, 0, 0.5, 1],
//         [0.8, 0.85, 1.1, 0.85, 0.8]
//       );

//       return {
//         transform: [
//           {
//             translateX,
//           },
//           {
//             translateY,
//           },
//           { scale },
//         ],
//       };
//     },
//     [centerOffset, itemSize]
//   );

//   return (
//     <View
//       style={[
//         {
//           width: pageWidth,
//           height: itemSize, // Set the height of the container to match the item size
//           alignItems: "center", // Center the items horizontally within the container
//         },
//         containerStyle,
//       ]}
//     >
//       <Carousel
//         width={itemSize}
//         height={itemSize}
//         style={{ flex: 1 }}
//         loop={loop}
//         data={data}
//         renderItem={renderItem}
//         customAnimation={animationStyle || defaultAnimationStyle}
//         onProgressChange={(_, absoluteIndex) => {
//           if (onScroll) {
//             const maxIndex = data.length - 1;
//             const wrappedIndex = Math.round(absoluteIndex) % (maxIndex + 1); // Wrap index to stay within bounds
//             onScroll(wrappedIndex);
//           }
//         }}
//       />
//     </View>
//   );
// };

// export default CustomCarousel;
