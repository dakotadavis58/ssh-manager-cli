# SSH CLI Helper

SSH CLI Helper is a command-line tool designed to streamline the management of SSH connections using batch files. This tool simplifies the process of creating and connecting to SSH sessions, making it an essential utility for developers and system administrators who frequently connect to remote servers.

## Why I Created This Tool

I developed SSH CLI Helper to efficiently manage my SSH connections to various servers at work. The repetitive task of manually setting up SSH connections can be cumbersome and error-prone. This project not only addresses that challenge but also serves as a practical exercise in building and deploying CLI tools.

## Features

- **Easy Batch File Creation**: Quickly generate SSH batch files with minimal input.
- **Seamless Connections**: Connect to servers using pre-configured batch files.
- **Cross-Platform Support**: Works on Windows, macOS, and Linux.

## Skills Demonstrated

- **Node.js Development**: Utilizes modern JavaScript features and Node.js modules.
- **CLI Design**: Implements a user-friendly command-line interface with yargs.
- **File System Management**: Efficiently handles file creation and configuration storage.
- **Cross-Platform Compatibility**: Adapts to different operating systems for a consistent user experience.

## Installation

To install SSH CLI Helper globally, use npm:

```bash
npm install -g @dakotadavis58/ssh-manager-cli
```

## Usage

### Initial Setup

On the first run, you will be prompted to specify a destination folder for your SSH batch files. This configuration is saved for future use, eliminating the need for repeated setup.

### Create a New SSH Batch File

To create a new SSH batch file, execute:

```bash
ssh-manager create
```

Follow the prompts to enter the server IP, username, and select a PEM file.

### Connect Using an Existing SSH Batch File

To connect using an existing batch file, run:

```bash
ssh-manager connect
```

Select the desired batch file from the list to initiate the connection.

## Options

- `--destination, -d`: Temporarily specify a different folder for SSH batch files. This does not alter the stored configuration.

## Benefits of Using SSH CLI Helper

- **Efficiency**: Automates repetitive tasks, saving time and reducing errors.
- **Convenience**: Centralizes SSH connection management in a single tool.
- **Scalability**: Easily manage multiple server connections without manual setup.

## License

This project is licensed under the MIT License.

## Conclusion

SSH CLI Helper is a powerful tool for anyone who frequently connects to remote servers. By automating the setup and connection process, it enhances productivity and reduces the potential for errors. Whether you're a developer, system administrator, or IT professional, this tool is designed to make your workflow more efficient and enjoyable.
