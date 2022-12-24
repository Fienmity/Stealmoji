import { getIDByName } from "enmity/api/assets"
import { FormRow, Image, ScrollView, TouchableOpacity } from "enmity/components"
import { Constants, Navigation, React, Toasts } from "enmity/metro/common"
import { EmojiModule, GuildStore, PermissionsStore } from "../modules"
import GuildIcon from "./GuildIcon"

const Permissions = Constants.Permissions

const Add = getIDByName('add_white')
const Checkmark = getIDByName('Check')

export default function AddEmojiGuildSelect({ emojiNode }) {
	// Get guilds as a Array of ID and value pairs, and filter out guilds the user can't edit emojis in
	const guilds = Object.entries(GuildStore.getGuilds()).filter(([guildId, guild]) => PermissionsStore.can(Permissions.MANAGE_GUILD_EXPRESSIONS, guild))

	const addToServerCallback = (guildId, guildName) => {
		// Fetch emoji
		fetch(emojiNode.src).then((resp) => {
			// Get it as a blob
			resp.blob().then((blob) => {
				// Turn it into a data URL
				const reader = new FileReader();
				reader.readAsDataURL(blob)
				// Called when data URL is ready
				reader.onloadend = () => {
					const dataUrl = reader.result
					// Upload emoji
					EmojiModule.uploadEmoji({
						guildId: guildId,
						image: dataUrl,
						name: emojiNode.alt,
						roles: undefined
					}).then(() => {
						Toasts.open({ content: `Added ${emojiNode.alt} to ${guildName}`, source: Checkmark })
						Navigation.pop()
					})
				}
			})
		})
	}

	return (
		<ScrollView>
			{guilds.map(([guildId, guild]) =>
				<TouchableOpacity onPress={() => addToServerCallback(guildId, guild?.name)}>
					<FormRow
						leading={<GuildIcon guild={guild} size="LARGE" animate={false} />}
						label={guild?.name}
						trailing={<Image source={Add} />}
					/>
				</TouchableOpacity>

			)}
		</ScrollView>
	)
}
