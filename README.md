# SSH CLI Helper

This is a command-line tool to help manage SSH connections using batch files. It allows you to create and connect to SSH sessions easily. I created this project to help me manage my SSH connections to my servers at work and to test out creating and setting up my own CLI tools.

## Features

- Create SSH batch files with ease.
- Connect to servers using existing batch files.
- Supports Windows, macOS, and Linux.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dakotadavis58/ssh-manager-cli.git
   cd ssh-manager-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the script globally:
   ```bash
   npm link
   ```

## Usage

### Initial Setup

On the first run, you will be prompted to enter a destination folder where your SSH batch files will be saved. This location will be stored in a configuration file, so you won't need to enter it again in future sessions.

### Create a New SSH Batch File

To create a new SSH batch file, run:

```bash
ssh-manager create
```

### Connect Using an Existing SSH Batch File

To connect using an existing batch file, run:

```bash
ssh-manager connect
```

## Options

- `--destination, -d`: Specify a different folder for SSH batch files temporarily. This does not change the stored configuration.

## License

This project is licensed under the MIT License.
