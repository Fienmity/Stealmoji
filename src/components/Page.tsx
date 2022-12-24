import { React, Navigation, NavigationNative, NavigationStack, StyleSheet, Constants } from 'enmity/metro/common';
import { TouchableOpacity, Text, View } from 'enmity/components';

export const PageNavigator = NavigationStack.createStackNavigator();

export default ({
	name = 'Page',
	component = View,
} = {}) => {
	const styles = StyleSheet.createThemedStyleSheet({
		container: {
			backgroundColor: StyleSheet.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
			flex: 0.5,
		},

		card: {
			backgroundColor: StyleSheet.ThemeColorMap.BACKGROUND_MOBILE_PRIMARY,
			color: Constants.ThemeColorMap.TEXT_NORMAL
		},

		header: {
			backgroundColor: StyleSheet.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
			shadowColor: 'transparent',
			elevation: 0,
		},

		text: {
			color: StyleSheet.ThemeColorMap.HEADER_PRIMARY,
			fontFamily: Constants.Fonts.PRIMARY_NORMAL,
			fontSize: 16,
			marginLeft: 16,
			backgroundColor: 'transparent'
		}
	});

	const Button = ({ onPress, title }) => {
		return (
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		);
	}

	return <NavigationNative.NavigationContainer>
		<PageNavigator.Navigator
			initialRouteName={name}
			style={styles.container}
			screenOptions={{
				cardOverlayEnabled: false,
				cardShadowEnabled: false,
				cardStyle: styles.card,
				headerStyle: styles.header,
				headerTitleContainerStyle: { color: Constants.ThemeColorMap.HEADER_PRIMARY },
				headerTitleAlign: 'center',
				safeAreaInsets: {
					top: 0,
				},
			}}
		>
			<PageNavigator.Screen
				name={name}
				component={component}
				options={{
					headerTitleStyle: {
						color: 'white',
						fontFamily: Constants.Fonts.PRIMARY_NORMAL
					},
					headerLeft: () => (<Button
						title={"Close"}
						onPress={(): void => {
							Navigation.pop()
						}}
					/>),
					...NavigationStack.TransitionPresets.ModalSlideFromBottomIOS
				}}
			/>
		</PageNavigator.Navigator>
	</NavigationNative.NavigationContainer>;
}
