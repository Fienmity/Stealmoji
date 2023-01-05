import { bulk, filters } from "enmity/metro";

export const [
	LazyActionSheet,
	ButtonModule,
	TextModule,
	Clipboard,
	EmojiModule,
	GuildStore,
	GuildIconModule,
	PermissionsStore
] = bulk(
	filters.byProps("openLazy", "hideActionSheet"),
	filters.byProps("ButtonColors", "ButtonLooks", "ButtonSizes"),
	filters.byProps("TextStyleSheet"),
	filters.byProps("setString", "setImage"),
	filters.byProps("uploadEmoji"),
	filters.byProps("getGuilds"),
	filters.byProps("GuildIconSizes"),
	filters.byProps("can", "_dispatcher"),
);
