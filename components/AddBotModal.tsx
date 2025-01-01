// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";
// import CustomCarousel from "./CustomCarousel";

// interface User {
//   id: string;
//   name: string;
//   avatar: any;
//   description?: string;
// }

// interface AddBotModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   onSelectBot: (bot: User) => void;
//   availableBots: User[];
// }

// const AddBotModal = ({
//   isVisible,
//   onClose,
//   onSelectBot,
//   availableBots,
// }: AddBotModalProps) => {
//   const [selectedBot, setSelectedBot] = useState<User>(availableBots[0]);

//   const handleScroll = (index: number) => {
//     setSelectedBot(availableBots[index]);
//   };

//   return (
//     <Modal
//       visible={isVisible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>Select a Bot</Text>

//           {/* Custom Carousel for selecting bots */}
//           <CustomCarousel
//             data={availableBots}
//             itemSize={200} // Size for each item (the bot avatars)
//             pageWidth={200} // Width of the carousel page
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.avatarContainer}
//                 onPress={() => setSelectedBot(item)}
//               >
//                 <View style={styles.avatarWrapper}>
//                   <Image source={item.avatar} style={styles.avatar} />
//                 </View>
//               </TouchableOpacity>
//             )}
//             containerStyle={styles.carouselContainer}
//             onScroll={handleScroll} // Callback for scroll end
//           />

//           {/* Bot Information Section */}
//           <View style={styles.botInfoContainer}>
//             <Text style={styles.botName}>{selectedBot.name}</Text>
//             <Text style={styles.botDescription}>{selectedBot.description}</Text>
//           </View>

//           {/* Close Button */}
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>

//           {/* Select Bot Button */}
//           <TouchableOpacity
//             onPress={() => onSelectBot(selectedBot)}
//             style={styles.selectButton}
//           >
//             <Text style={styles.selectButtonText}>Select Bot</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
//   },
//   modalContainer: {
//     width: "80%",
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     alignItems: "center",
//     alignSelf: "center"
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   avatarContainer: {
//     marginHorizontal: 10,
//     alignItems: "center",
//   },
//   avatarWrapper: {
//     borderRadius: 60, // Circular shape for avatar container
//     overflow: "hidden",
//     borderWidth: 3,
//     borderColor: "#ddd",
//     width: 120,
//     height: 120,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50, // Circular avatar image
//   },
//   carouselContainer: {
//     marginVertical: 20,
//   },
//   botInfoContainer: {
//     marginTop: 10,
//     alignItems: "center",
//   },
//   botName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   botDescription: {
//     fontSize: 14,
//     color: "#777",
//     textAlign: "center",
//     marginHorizontal: 20,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#007BFF",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   selectButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#28a745",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   selectButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default AddBotModal;
