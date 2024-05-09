#!/usr/bin/env node

import fs from "fs/promises";
import { join } from "path";
import inquirer from "inquirer";
import { exec } from "child_process";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const homeDir = process.env.HOME || process.env.USERPROFILE;
const sshDir = join(homeDir, ".ssh");
const configPath = join(homeDir, ".ssh_batch_config.json");

async function ensureConfig() {
  try {
    const configData = await fs.readFile(configPath, "utf-8");
    return JSON.parse(configData);
  } catch {
    console.log("No configuration found. Let's set it up.");
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "destinationFolder",
        message: "Where would you like to save your SSH batch files?",
        default: join(homeDir, "Documents", "SSH-Scripts"),
      },
    ]);
    await fs.writeFile(configPath, JSON.stringify(answers, null, 2));
    return answers;
  }
}

const argv = yargs(hideBin(process.argv))
  .command(
    "create",
    "Create a new SSH batch file",
    () => {},
    async (argv) => {
      const config = await ensureConfig();
      askDetailsAndCreate(config.destinationFolder);
    }
  )
  .command(
    "connect",
    "Connect using an existing SSH batch file",
    () => {},
    async (argv) => {
      const config = await ensureConfig();
      listAndConnect(config.destinationFolder);
    }
  )
  .demandCommand(1, "You must provide a valid command.")
  .help()
  .alias("help", "h").argv;

async function askDetailsAndCreate(destinationFolder) {
  const questions = [
    { type: "input", name: "ip", message: "Enter the server IP:" },
    { type: "input", name: "username", message: "Enter the username:" },
    {
      type: "input",
      name: "filename",
      message: "Enter a name for this batch file (no extension):",
    },
    {
      type: "list",
      name: "pemFile",
      message: "Select your PEM file:",
      choices: async () => {
        const pemFiles = await getPEMFiles();
        return pemFiles.length ? pemFiles : ["No PEM files found"];
      },
    },
  ];
  const answers = await inquirer.prompt(questions);
  generateBatchFile(answers, destinationFolder);
}

async function listAndConnect(destinationFolder) {
  const questions = [
    {
      type: "list",
      name: "batchFile",
      message: "Select a batch file to connect:",
      choices: async () => {
        const batchFiles = await listBatchFiles(destinationFolder);
        return batchFiles.length ? batchFiles : ["No batch files found"];
      },
    },
  ];
  const answers = await inquirer.prompt(questions);
  connectToServer(answers.batchFile, destinationFolder);
}

async function listBatchFiles(destinationFolder) {
  try {
    const files = await fs.readdir(destinationFolder);
    return files.filter((file) => file.endsWith(".bat"));
  } catch (err) {
    console.error("Failed to read batch files directory:", err);
    return [];
  }
}

function connectToServer(filename, destinationFolder) {
  const filePath = join(destinationFolder, filename);
  exec(`start cmd.exe /k "${filePath}"`);
}

async function getPEMFiles() {
  try {
    const files = await fs.readdir(sshDir);
    return files.filter((file) => file.endsWith(".pem"));
  } catch (err) {
    console.error("Failed to read .ssh directory:", err);
    return [];
  }
}

function generateBatchFile(answers, destinationFolder) {
  const { ip, username, pemFile, filename } = answers;
  const pemPath = join(sshDir, pemFile);
  const content = `@echo off\nssh -i "${pemPath}" ${username}@${ip}`;
  const filePath = join(destinationFolder, `${filename}.bat`);

  fs.mkdir(destinationFolder, { recursive: true })
    .then(() => fs.writeFile(filePath, content))
    .then(() => console.log(`Batch file created at: ${filePath}`))
    .catch((err) => console.error("Error creating directory or file:", err));
}
