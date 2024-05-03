# google-takeout-fixer

This tool fixes the out-of-order issue for files exported using Google Takeout. It modifies individual files create time from corresponding metadata file.

## Setup and use

In order to use this tool, follow these steps:

 - Clone [this](https://github/azraftaohid/google-takeout-fixer) repository.
 - Initialize the project by executing `yarn` within the command line at the root of this cloned repository.
 - Modify the [config](src/config.ts) file to set `filesDir` and `metadataDir` property.  
 - Finally, run: `yarn start`

> Note: In Windows, make sure to escape the backslash `\\` character in path.

## Features

Currently, this tool offers the following features:

### File create time
It automatically updates the creation time of files from corresponding metadata.

## License
All files on the google-takeout-fixer GitHub repository are subject to the MIT License. Please read the [LICENSE](LICENSE) file at the root of the project.
