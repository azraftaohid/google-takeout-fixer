export const config: Config = {
	// Path to folder containing files.
	filesDir: "res/Takeout",
	// Path to folder containing corresponding metadata files. By default it is the same as `filesDir`.
	// Corresponding metadata files are mapped by relative term. For instance, filesDir/a/b/x.ext would look for metadata
	// at the location metadataDir/a/b/x.json
	metadataDir: "res/Takeout",
}

interface Config {
	filesDir: string,
	metadataDir?: string,
}
