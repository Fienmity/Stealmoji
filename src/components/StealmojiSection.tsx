import { FormDivider, View } from "enmity/components";
import { Navigation, React, StyleSheet, Toasts } from "enmity/metro/common";
import { getIDByName } from 'enmity/api/assets';
import { ClipboardModule, LazyActionSheet } from "../modules";
import Button from "./Button";
import Text from "./Text";
import Page from "./Page";
import AddEmojiGuildSelect from "./AddEmojiGuildSelect";

// Icons
const Copy = getIDByName('toast_copy_link')

interface EmojiNode {
	frozenSrc: string
	type: string
	jumboable: boolean
	src: string
	alt: string
	id: string
}

interface StealmojiSectionProps {
	key: string
	emojiNode: EmojiNode
}

const styles = StyleSheet.createThemedStyleSheet({
	divider: {
		backgroundColor: StyleSheet.ThemeColorMap.BACKGROUND_ACCENT,
		marginLeft: 0,
		marginTop: 16,
	},
	title: {
		flexDirection: "column",
		paddingTop: 16
	},
	button: { marginTop: 16 }
})

export default function StealmojiSection({ emojiNode }: StealmojiSectionProps) {
	const copyEmojiUrlCallback = () => {
		// Copy emoji URL
		ClipboardModule.Clipboard.setString(emojiNode.src)
		Toasts.open({ content: `Copied ${emojiNode.alt}'s URL`, source: Copy })
		// Close the actionsheet
		LazyActionSheet.hideActionSheet()
	}

	const addToServerCallback = () => {
		// Close actionsheet
		LazyActionSheet.hideActionSheet()
		// Open server picker to add emoji to
		Navigation.push(Page, { component: () => <AddEmojiGuildSelect emojiNode={emojiNode} />, name: 'Add to Server' })
	}

	const buttons = [
		{ text: "Add to Server", callback: addToServerCallback },
		{ text: "Copy URL", callback: copyEmojiUrlCallback }
	]

	return (
		<>
			<FormDivider style={styles.divider} />
			<View style={styles.title}>
				<Text variant="eyebrow" color="header-secondary">Stealmoji</Text>
			</View>
			{buttons.map(({ text, callback }) =>
				<Button
					color='brand'
					text={text}
					size='small'
					onPress={callback}
					style={styles.button}
				/>
			)}
		</>
	)
}
