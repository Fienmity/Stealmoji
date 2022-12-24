import { bulk, filters } from "enmity/metro";

export const [
	LazyActionSheet,
	ButtonModule,
	TextModule,
	ClipboardModule,
	EmojiModule,
	GuildStore,
	GuildIconModule,
	PermissionsStore,
	PermissionsModule
] = bulk(
	filters.byProps("openLazy", "hideActionSheet"),
	filters.byProps("ButtonColors", "ButtonLooks", "ButtonSizes"),
	filters.byProps("TextStyleSheet"),
	filters.byProps("Clipboard"),
	filters.byProps("uploadEmoji"),
	filters.byProps("getGuilds"),
	filters.byProps("GuildIconSizes"),
	filters.byProps("can", "_dispatcher"),
	filters.byProps("Permissions")
);
