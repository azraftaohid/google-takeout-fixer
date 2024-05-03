import fsp from "fs/promises";
import path, { sep } from "path";
import { utimes } from "utimes";
import { config } from "./config";

async function fixCreateTime(filesDir: string, metadataDir = filesDir) {
	const root = path.resolve(filesDir);
	const contents = await fsp.readdir(root, { recursive: true, withFileTypes: true });
	
	let successCount = 0;
	let matchCount = 0;
	for (const content of contents) {
		if (!content.isFile() || content.name.endsWith(".json")) continue;
		matchCount++;

		const relDir = content.path.slice(root.length + 1);
		const publicName = relDir + sep + content.name;

		let metadata: Metadata;
		const metadataName = (content.name.startsWith("[fav] ") 
			? content.name.split("[fav] ")[1] 
			: content.name).slice(0, 46) + ".json";
		const metadataPath = path.resolve(metadataDir, relDir, metadataName);

		try {
			const txt = await fsp.readFile(metadataPath).then(v => v.toString());
			metadata = JSON.parse(txt);
		} catch (error) {
			console.error(`${publicName}: metadata read failed:`, error);
			continue;
		}

		const filePath = path.resolve(content.path, content.name);
		const createTime = +metadata.creationTime.timestamp * 1000;

		try {
			await utimes(filePath, { btime: createTime, mtime: createTime });
		} catch (error) {
			console.error(`${publicName}: file update failed:`, error);
		}

		if (metadata.favorited) {
			const newPath = path.resolve(filesDir, relDir, `[fav] ${metadata.title}`);
			try {
				await fsp.rename(filePath, newPath);
			} catch (error) {
				console.error(`${publicName}: fav rename failed:`, error);
			}
		}

		successCount++;
	}

	return { matchCount, successCount };
}

fixCreateTime(config.filesDir, config.metadataDir).then(({ matchCount, successCount }) => {
	console.log(`Matched: ${matchCount}; fixed: ${successCount}`);
	console.info("Done.");
}).catch(error => {
	console.error("An error occurred:", error);
});

interface Metadata {
	title: string,
	creationTime: {
		timestamp: string,
	},
	photoTakenTime: {
		timestamp: string,
	},
	favorited?: boolean,
}
