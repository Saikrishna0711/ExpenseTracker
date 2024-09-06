import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity,Dimensions } from 'react-native';
// import Swiper from 'swiper';
// import Swiper from 'react-native-swiper/src';

// import 'swiper/swiper-bundle.css'; // Import Swiper styles

// import { NavItem, NavLink, Nav } from "reactstrap";

const testsidebar = ({ hasOverlay, isRight }) => {
  const { width, height } = Dimensions.get('window');
  const imageData = [
    require('./assets/image.png'),
    require('./assets/icon.png'),
    require('./assets/image.png'),
    // Add more images as needed
  ];
  // const [sidebarIsOpen, setSidebarOpen] = useState(true);
  // const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  // const [isOpen, setIsOpen] = useState(false);
  // const openSidebar = () => {
  //   setIsOpen(true);
  // };

  // const closeSidebar = () => {
  //   setIsOpen(false);
  // };
  // const SidebarUI = ({ isOpen, ...rest }) => {
  //   const classes = ['Sidebar', isOpen ? 'is-open' : ''];

  //   return (
  //     <View aria-hidden={!isOpen} style={[styles.sidebar, isOpen && styles.sidebarOpen]} {...rest} />
  //   );
  // };

  // SidebarUI.Overlay = (props) => <TouchableOpacity style={styles.overlay} {...props} />;

  // SidebarUI.Content = ({ width = '20rem', isRight = false, ...rest }) => {
  //   const classes = ['SidebarContent', isRight ? 'is-right' : ''];
  //   const style = {
  //     width,
  //     height: '100%',
  //     top: 0,
  //     right: isRight ? `-${width}` : 'auto',
  //     left: !isRight ? `-${width}` : 'auto',
  //   };

  //   return (
  //     <View style={[styles.sidebarContent, isRight && styles.sidebarContentRight, style]} {...rest} />
  //   );
  // };
  useEffect(() => {
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2400,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);
  return (
    <View>

      {/* //   <View style={styles.container}>
    //     <TouchableOpacity onPress={openSidebar}>
    //       <Text> Sidebar</Text>
    //     </TouchableOpacity>

    //     <View style={[styles.sidebar, isOpen && styles.sidebarOpen]}>
    //       <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: userName })}>
    //         <View style={styles.sidebarItem}>
    //           <Text style={styles.sidebarOption}>Profile</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { username: userName })}>
    //           <View style={styles.sidebarItem}>
    //             <Text style={styles.sidebarOption}>Add Expense</Text>
    //           </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('ExpenseList', { username: userName })}>
    //           <View style={styles.sidebarItem}>
    //             <Text style={styles.sidebarOption}>Expense List</Text>
    //           </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('ExpenseCategorization', { username: userName })}>
    //           <View style={styles.sidebarItem}>
    //             <Text style={styles.sidebarOption}>Expense Categorization</Text>
    //           </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('ExpenseAnalytics', { username: userName })}>
    //           <View style={styles.sidebarItem}>
    //             <Text style={styles.sidebarOption}>Expense Analytics</Text>
    //           </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('FinancialGoalSetting', { username: userName })}>
    //           <View style={styles.sidebarItem}>
    //             <Text style={styles.sidebarOption}>Financial Goal Setting</Text>
    //           </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('Login', { redirected: "Login" })}>
    //           <View style={styles.sidebarItem}>
    //             <Text style={styles.sidebarOption}>Logout</Text>
    //           </View>
    //         </TouchableOpacity>
    //     </View>

    //     {isOpen && ( */}
      {/* <TouchableOpacity style={styles.overlay} onPress={closeSidebar} />
   )} */}

      <section id="slider__container">
        <article id="article__container" style={styles.articleContainer} className="swiper mySwiper">
          <div className="swiper-wrapper">

            {/* <View className="swiper-slide swiper-slide--style" style={styles.slide}>
              <View className="container__text" style={styles.containerText}></View>
              <View id="slide__img1" style={[styles.slideImg, styles.slideImg1]}></View>
            </View> */}
            <Swiper style={{ height: height * 0.35 }}>
              {imageData.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={image} style={styles.slideImage} />
                </View>
              ))}
            </Swiper>
            <div className="swiper-slide swiper-slide--style">
              <View className="swiper-slide swiper-slide--style" style={styles.slide}>
                <View className="container__text" style={styles.containerText}></View>
                <View id="slide__img1" style={[styles.slideImg, styles.slideImg1]}></View>
              </View>
            </div>
            <div className="swiper-slide swiper-slide--style">
              <View className="swiper-slide swiper-slide--style" style={styles.slide}>
                <View className="container__text" style={styles.containerText}></View>
                <View id="slide__img1" style={[styles.slideImg, styles.slideImg1]}></View>
              </View>
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </article>
      </section>

    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // sidebar: {
  //   position: 'absolute',
  //   top: 0,
  //   left: -200,
  //   width: 200,
  //   height: '100%',
  //   // backgroundColor: '#fff',
  //   zIndex: 100,
  //   transitionProperty: 'left',
  //   transitionDuration: '300ms',
  //   transitionTimingFunction: 'ease-in-out',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',

  // },
  // sidebarOpen: {
  //   left: 0,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',

  // },
  // overlay: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   zIndex: 99,
  // },
  // sidebarOpen: {
  //   left: 0,
  // },
  // sidebarContent: {
  //   position: 'absolute',
  //   top: 0,
  //   backgroundColor: 'white',
  //   zIndex: 100,
  //   transitionProperty: 'left',
  //   transitionDuration: '300ms',
  //   transitionTimingFunction: 'ease-in-out',
  // },
  // sidebarContentRight: {
  //   left: 'auto',
  //   right: -200,
  // },
  // sidebarOption: {
  //   fontSize: 16,
  //   marginBottom: 16,
  //   color: 'black'
  // },
  articleContainer: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '10%',
    left: '10%',
    borderRadius: 6,
    backgroundColor: '#dcdde0',
    boxShadow: '6px 6px 12px #c4c5c7, -6px -6px 12px #c4c5c7',
  },

  slideImg: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: 'aqua',
    left: '40%',
    top: '-5%',
    overflow: 'hidden',
    clipPath: 'circle(50%)',
  },
  slideImg1: {
    backgroundImage: "url('https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
    backgroundRepeat: 'no-repeat',
  },
  slideImg2: {
    backgroundImage: "url('https://images.unsplash.com/photo-1543871595-e11129e271cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
    backgroundRepeat: 'no-repeat',
  },
  slideImg3: {
    backgroundImage: "url('https://images.unsplash.com/photo-1622403974791-6535771380d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
    backgroundRepeat: 'no-repeat',
  },
  sliderContainer: {
    position: 'absolute',
    width: '100%',
    height: '80%',
  },
  articleContainer: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '10%',
    left: '10%',
    borderRadius: 6,
    backgroundColor: '#dcdde0',
    boxShadow: '6px 6px 12px #c4c5c7, -6px -6px 12px #c4c5c7',
  },

  slide: {
    overflow: 'hidden',
  },
  slideImg: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: 'aqua',
    left: '40%',
    top: '-5%',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  slideImg1: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
});

export default testsidebar;