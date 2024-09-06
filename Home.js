import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
// import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper/src';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const route = useRoute()
  const userName = route.params?.username

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };



  // Sample image data
  const imageData = [
    require('./assets/pexels-monstera-production-5849559.jpg'),
    require('./assets/pexels-karolina-grabowska-4386339.jpg'),
    require('./assets/pexels-william-fortunato-6393017.jpg'),
    // Add more images as needed
  ];

  // Animated values for square boxes
  const box1Left = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the first box on mount
    Animated.timing(box1Left, {
      toValue: 100, // Adjust the desired position
      duration: 1000,
      useNativeDriver: false, // Set to true if possible
    }).start();
  }, [box1Left]);

  const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);

    const handleArrowClick = (e) => {
      const arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("showMenu");
      setShowMenu(!showMenu);
    };

    const handleSidebarToggle = () => {
      setIsSidebarClosed(!isSidebarClosed);
    };
  }

  return (
    // <ImageBackground source={require('./assets/image.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      {/* Sidebar */}
      {sidebarOpen && (
        <View style={styles.sidebar}>
          {/* //   <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
        //     <Icon name="bars" size={10} color="#3498db" />
        //   </TouchableOpacity> */}

          {/* Sidebar Options */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: userName })}>
            <Text style={styles.sidebarOption}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { username: userName })}>
            <Text style={styles.sidebarOption}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ExpenseList', { username: userName })}>
            <Text style={styles.sidebarOption}>Expense List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ExpenseCategorization', { username: userName })}>
            <Text style={styles.sidebarOption}>Expense Categorization</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ExpenseAnalytics', { username: userName })}>
            <Text style={styles.sidebarOption}>Expense Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FinancialGoalSetting', { username: userName })}>
            <Text style={styles.sidebarOption}>Financial Goal Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login', { redirected: "Login" })}>
            <Text style={styles.sidebarOption}>Logout</Text>
          </TouchableOpacity>


          {/* new Style */}
          {/* <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: userName })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { username: userName })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Add Expense</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ExpenseList', { username: userName })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Expense List</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ExpenseCategorization', { username: userName })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Expense Categorization</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ExpenseAnalytics', { username: userName })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Expense Analytics</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FinancialGoalSetting', { username: userName })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Financial Goal Setting</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login', { redirected: "Login" })}>
              <View style={styles.sidebarItem}>
                <Text style={styles.sidebarOption}>Logout</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.homeSection}>
              <View style={styles.homeContent}>
                <Ionicons name="menu" size={24} color="black" />
                <Text style={styles.text}></Text>
              </View>
            </View>

          </View> */}

          {/* Add more sidebar options as needed */}
        </View>
      )}

      {/* Main Content */}
      <View style={[styles.main]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
            <Icon name="bars" size={20} color="#3498db" />
          </TouchableOpacity>

          {/* Search Bar */}
          {/* <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
            // Add search functionality as needed
            />
          </View> */}
        </View>

        {/* Image Slideshow */}
        <Swiper style={{ height: height * 0.35 }}>
          {imageData.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={image} style={styles.slideImage} />
            </View>
          ))}
        </Swiper>

        {/* Square Type Boxes */}
        <View style={styles.squareContainer}>
          {/* First Row */}
          <View style={styles.squareRow}>
            <TouchableOpacity
              style={styles.squareBox}
              onPress={() => navigation.navigate('AddExpense', { username: userName })}
            >
              <Text style={styles.squareBoxText}>Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.squareBox}
              onPress={() => navigation.navigate('ExpenseList', { username: userName })}
            >
              <Text style={styles.squareBoxText}>Expense list</Text>
            </TouchableOpacity>
          </View>
        </View>





        {/* Second Row */}
        <View style={styles.squareRow}>
          <TouchableOpacity
            style={styles.squareBox}
            onPress={() => navigation.navigate('ExpenseCategorization', { username: userName })}
          >
            <Text style={styles.squareBoxText}>Expense Categorization</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.squareBox}
            onPress={() => navigation.navigate('ExpenseAnalytics', { username: userName })}
          >
            <Text style={styles.squareBoxText}>Expense Analytics</Text>
          </TouchableOpacity>
        </View>




        {/* Add more rows as needed */}
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    padding: 16,
    transitionProperty: 'margin',
    transitionDuration: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
    width: width * 0.6, // Adjust the width as needed
  },
  sidebar: {
    backgroundColor: '#f0f0f0',
    width: width * 0.3,
    paddingTop: 16,
    paddingLeft: 16,
    borderRightWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
  },
  sidebarOption: {
    fontSize: 16,
    marginBottom: 16,
    color: 'black'
  },
  closeButton: {
    marginTop: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  squareContainer: {
    marginTop: 20,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  squareBox: {
    backgroundColor: 'rgba(52, 73, 94, 0.9)',
    borderRadius: 8,
    width: 180,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  squareBoxText: {
    color: '#ecf0f1',
    fontSize: 16,
  },

  // new styles
  // sidebar: {
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   height: '100%',
  //   width: 260,
  //   backgroundColor: '#000428',
  //   zIndex: 100,
  //   transitionDuration: '0.5s',
  // },
  // sidebarClose: {
  //   width: 78,
  // },
  // logoDetails: {
  //   height: 60,
  //   width: '100%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // logoIcon: {
  //   fontSize: 30,
  //   color: '#fff',
  //   height: 50,
  //   minWidth: 78,
  //   textAlign: 'center',
  //   lineHeight: 50,
  // },
  // logoName: {
  //   fontSize: 22,
  //   color: '#fff',
  //   fontWeight: '600',
  //   transitionDuration: '0.3s',
  //   transitionDelay: '0.1s',
  // },
  // logoNameClose: {
  //   transitionDelay: '0s',
  //   opacity: 0,
  //   pointerEvents: 'none',
  // },
  // navLinks: {
  //   height: '100%',
  //   paddingBottom: 150,
  //   overflow: 'auto',
  // },
  // navLinksClose: {
  //   overflow: 'visible',
  // },
  // navLinksScrollbar: {
  //   display: 'none',
  // },
  // navLinksItem: {
  //   position: 'relative',
  //   listStyle: 'none',
  //   transitionDuration: '0.4s',
  // },
  // navLinksItemHover: {
  //   backgroundColor: '#1d1b31',
  // },
  // iconLink: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // navLinksItemIcon: {
  //   height: 50,
  //   minWidth: 78,
  //   textAlign: 'center',
  //   lineHeight: 50,
  //   color: '#fff',
  //   fontSize: 20,
  //   cursor: 'pointer',
  //   transitionDuration: '0.3s',
  // },
  // navLinksItemShowMenu: {
  //   transform: [{ rotate: '-180deg' }],
  // },
  // navLinksItemCloseArrow: {
  //   display: 'none',
  // },
  // navLinksItemLink: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   textDecorationLine: 'none',
  // },
  // linkName: {
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: '#fff',
  //   transitionDuration: '0.4s',
  // },
  // linkNameClose: {
  //   opacity: 0,
  //   pointerEvents: 'none',
  // },
  // subMenu: {
  //   padding: '6px 6px 14px 80px',
  //   marginTop: -10,
  //   backgroundColor: '#1d1b31',
  //   display: 'none',
  // },
  // subMenuShow: {
  //   display: 'block',
  // },
  // subMenuItem: {
  //   color: '#fff',
  //   fontSize: 15,
  //   paddingVertical: 5,
  //   paddingHorizontal: 0,
  //   whiteSpace: 'nowrap',
  //   opacity: 0.6,
  //   transitionDuration: '0.3s',
  // },
  // subMenuItemHover: {
  //   opacity: 1,
  // },
  // subMenuBlank: {
  //   opacity: 1,
  //   pointerEvents: 'auto',
  //   padding: '3px 20px 6px 16px',
  //   opacity: 0,
  //   pointerEvents: 'none',
  // },
  // profileDetails: {
  //   position: 'fixed',
  //   bottom: 0,
  //   width: 260,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#1d1b31',
  //   padding: '12px 0',
  //   transitionDuration: '0.5s',
  // },
  // profileDetailsClose: {
  //   background: 'none',
  // },
  // profileDetailsWidth: {
  //   width: 78,
  // },
  // profileContent: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // profileImage: {
  //   height: 52,
  //   width: 52,
  //   borderRadius: 16,
  //   margin: '0 14px 0 12px',
  //   backgroundColor: '#1d1b31',
  //   transitionDuration: '0.5s',
  // },
  // profileImageClose: {
  //   padding: 10,
  // },
  // profileName: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '500',
  //   whiteSpace: 'nowrap',
  // },
  // job: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '500',
  //   whiteSpace: 'nowrap',
  // },
  // jobSmall: {
  //   fontSize: 12,
  // },
  // homeSection: {
  //   position: 'relative',
  //   backgroundColor: '#e4e9f7',
  //   height: '100%',
  //   left: 260,
  //   width: 'calc(100% - 260px)',
  //   transitionDuration: '0.5s',
  // },
  // homeSectionClose: {
  //   left: 78,
  //   width: 'calc(100% - 78px)',
  // },
  // homeContent: {
  //   height: 60,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 20,
  //   marginTop:'-200px'
  // },
  // homeContentText: {
  //   color: '#11101d',
  //   fontSize: 35,
  // },
  // homeContentIcon: {
  //   marginHorizontal: 15,
  //   cursor: 'pointer',
  // },
  // homeContentTextSmall: {
  //   fontSize: 26,
  //   fontWeight: '600',
  // },
  // "@media (max-width: 420px)": {
  //   navLinksItemSubMenu: {
  //     display: 'none',
  //   }
  // },
});

// export default Dashboard;



// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import HighchartsReactNative from 'highcharts-react-native';
// import Header from './Header';

// const Dashboard = ({ navigation }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const route = useRoute()
//   const userName = route.params?.username

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const monthlySummaryData = [
//     { name: 'Oct 2019', amount: 115.64, color: '#3498db' },
//     { name: 'Sep 2021', amount: 20, color: '#e74c3c' },
//     // Add more data as needed
//   ];

//   return (
//     <View style={styles.container}>
//       <Header navigation={navigation} />
//       {/* Square Type Boxes */}
//       <View style={styles.squareContainer}>
//         {/* First Row */}
//         <View style={styles.squareRow}>
//           <TouchableOpacity
//             style={styles.squareBox}
//             onPress={() => navigation.navigate('AddExpense',{username : userName})}
//           >
//             <Text style={styles.squareBoxText}>Add Expense</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.squareBox}
//             onPress={() => navigation.navigate('ExpenseList',{username : userName})}
//           >
//             <Text style={styles.squareBoxText}>Expense list</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Second Row */}
//         <View style={styles.squareRow}>
//           <TouchableOpacity
//             style={styles.squareBox}
//             onPress={() => navigation.navigate('ExpenseCategorization',{username : userName})}
//           >
//             <Text style={styles.squareBoxText}>Expense Categorization</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.squareBox}
//             onPress={() => navigation.navigate('ExpenseAnalytics',{username : userName})}
//           >
//             <Text style={styles.squareBoxText}>Expense Analytics</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Monthly Summary */}
//       <View style={styles.summaryContainer}>
//         <HighchartsReactNative
//           // ...
//           chartConfig={{
//             // ...
//             plotOptions: {
//               series: {
//                 color: '#fff',
//                 dataLabels: {
//                   enabled: true,
//                   format: '{point.y:.2f}',
//                   style: {
//                     color: '#fff',
//                   },
//                 },
//               },
//             },
//           }}
//           series={[
//             {
//               type: 'pie',
//               data: monthlySummaryData,
//             },
//           ]}
//           style={{ height: 200, width: '100%' }}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   squareContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   squareRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryContainer: {
//     width: '100%',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

export default Dashboard;
