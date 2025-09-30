/** @param {NS} ns */
export async function main(ns) {

  // Initial Declarations
  const baseURL = "https://raw.githubusercontent.com/aGOLDstandard2/Sire-Botnet/main/";
  ns.print(`Info: Downloading files...`);
  ns.tprint(`Info: Downloading files, please wait...`);
  let f = 1;
  let s = 0;
  const maxRetry = 3;
  let fileFails = [];
  let fileWins = [];
  let skipCounter = 0;
  const fileCount = 16;

  // Main Script
  if (ns.fileExists("/sire.js")) {
    ns.print(`Info: sire.js already found. Skipping.`);
    f++;
    skipCounter++;
  }
  if (!ns.fileExists(`/sire.js`)){
    let retryCounter = 0;
    while (!ns.fileExists("/sire.js") && retryCounter < maxRetry) {
      ns.print(`Downloading file sire.js ${f}/16 - Attempt ${retryCounter + 1}/3`);
      await ns.wget(`${baseURL}sire.js`, `/sire.js`);
      retryCounter++;

      if (retryCounter >= maxRetry) {
        ns.print(`Warn: File extraction failed!`);
        fileFails.push(`/sire.js`);
        f++
      }
      if (ns.fileExists("/sire.js")) {
        ns.tprint(`Success: file sire.js ${f}/16 aqquired!`);
        fileWins.push(`/sire.js`);
        s++;
        f++;
      }
    }
    await ns.sleep(100);
  }

  // Logs dir creation
  if (ns.fileExists(`/logs/testLog.txt`)) {
    ns.print(`Info: /logs directory already found. Skipping.`);
    skipCounter++;
    f++
  } else {
    let retryCounter = 0;
    while (!ns.fileExists("/logs/testLog.txt") && retryCounter < maxRetry) {
      ns.print(`Downloading file ${f}/16 - Attempt ${retryCounter + 1}/3`);
      await ns.wget(`${baseURL}logs/testLog.txt`, `/logs/testLog.txt`);
      retryCounter++;

      if (retryCounter >= maxRetry) {
        ns.print(`Warn: File extraction failed!`);
        fileFails.push(`/logs/testLog.txt`);
        f++;
      }
      if (ns.fileExists("/logs/testLog.txt")) {
        ns.tprint(`Success: file /logs/testLog.txt ${f}/16 aqquired!`);
        fileWins.push(`/logs/testLog.txt`);
        f++;
        s++;
      }
    }
    await ns.sleep(100);
  }

// Tools
  const tools = [`cleanup.js`, `listener.js`, `jump.js`, `patient.js`, `patient2.js`, `updater.js`];
  for (let i = 0; i <= tools.length; i++) {
    if (ns.fileExists(`/tools/${tools[i]}`) && tools[i] !== undefined) {
      ns.print(`Info: ${tools[i]} already found. Skipping.`);
      skipCounter++;
    }
    if (!ns.fileExists(`/tools/${tools[i]}`) && tools[i] !== undefined){
      let retryCounter = 0;
      while (!ns.fileExists(`/tools/${tools[i]}`) && retryCounter < maxRetry) {
        ns.print(`Downloading file ${tools[i]} ${f}/16 - Attempt ${retryCounter + 1}/3`);
        await ns.wget(`${baseURL}tools/${tools[i]}`, `/tools/${tools[i]}`);
        retryCounter++;

        if (retryCounter >= maxRetry) {
          ns.print(`Error: File extraction failed!`);
          fileFails.push(`/tools/${tools[i]}`);
          f++;
        }
        if (ns.fileExists(`/tools/${tools[i]}`)) {
          ns.tprint(`Success: file ${tools[i]} ${f}/16 aqquired!`);
          fileWins.push(`/tools/${tools[i]}`);
          f++;
          s++;
        }
      }
      await ns.sleep(100);
    }
  }
  await ns.sleep(100);
  ns.print(`/tools directory building complete.`);

  // Utils
  const utils = [`alias.txt`, `guestBook.txt`, `lkt.txt`, `serverInfo.txt`, `sireLib.js`, `w.js`, `h.js`, `g.js`];
  for (let i = 0; i <= utils.length; i++) {
    if (ns.fileExists(`/utils/${utils[i]}`) && utils[i] !== undefined) {
      ns.print(`Info: ${utils[i]} already found. Skipping.`);
      skipCounter++;
    }
    if (!ns.fileExists(`/utils/${utils[i]}`) && utils[i] !== undefined){
      let retryCounter = 0;
      while (!ns.fileExists(`/utils/${utils[i]}`) && retryCounter < maxRetry) {
        ns.print(`Downloading file ${utils[i]} ${f}/16 - Attempt ${retryCounter + 1}/3`);
        await ns.wget(`${baseURL}utils/${utils[i]}`, `/utils/${utils[i]}`);
        retryCounter++;

        if (retryCounter >= maxRetry) {
          ns.print(`Error: File extraction failed!`);
          fileFails.push(`/utils/${utils[i]}`);
          f++;
        }
        if (ns.fileExists(`/utils/${utils[i]}`)) {
          ns.tprint(`Success: file ${utils[i]} ${f}/16 aqquired!`);
          fileWins.push(`/utils/${utils[i]}`);
          f++;
          s++;
        }
      }
      await ns.sleep(100);
    }
  }
  await ns.sleep(100);
  ns.print(`/utils directory building complete.`);

  // Cleanup
  ns.print(`Info: Cleaning up...`);
  ns.tprint(`Info: Cleaning up...`);

  // 1st check: Immediately terminate script if it was run redundantly
  if (skipCounter === fileCount) {
    ns.print(`Success: No missing files found! Stopping installer.`);
    ns.tprint(`SUCCESS: No missing files found! Stopping installer.`);
    ns.exit(``);

  // 2nd check: If any files failed to transfer, provide user feedback
  } else if (fileFails.length > 0) {
    ns.print(`Error: Some files failed to transfer.`);
    ns.print(`Error: Printing filenames to terminal.`);
    ns.tprint(`ERROR: The following files failed to transfer!`);
    for (let i = 0; fileFails.length > 0; i++) {
      if (i === fileFails.length) {
        ns.tprint(`WARN: ${fileFails[i]}`);
      } else {
        ns.tprint(`WARN: ${fileFails[i]},`)
      }
    }
    ns.tprint(`ERROR: Please check with your network administrator.`);

  // 3rd check: Check all files were downloaded or not
  } else if (s > 0 || s < fileCount) {
    if (fileFails.length === 0); {
      ns.print(`Warn: Partial file transfer detected!`);
      ns.tprint(`INFO: The following files have been repaired:`);
      for (let i = 0; i < fileWins.length; i++) {
        ns.tprint(`${fileWins[i]}`);
      }
    }
  } else {
    ns.tprint(`Success: All files attained! Stopping installer.`);
    ns.print(`Info: Sending quickstart UI prompt`);
    await ns.sleep(300);
    const helpCheck = await ns.prompt(`Would you like a quickstart guide?`);
    if (helpCheck == true) {
      ns.tprint(`-------------------------------------------------------------------------------------------------------------`);
      ns.tprint(`To begin, copy and paste the contents of /utils/alias.txt into the terminal and run.`);
      ns.tprint(`--------------------------------`);
      ns.tprint(`Next, use Sire to CRACK a target. Syntax:`);
      ns.tprint(`sire crack [target]`);
      ns.tprint(`--------------------------------`);
      ns.tprint(`Then use Sire to ATTACK your target. Syntax:`);
      ns.tprint(`sire attack [target]`);
      ns.tprint(`--------------------------------`);
      ns.tprint(`Finally, make sure to start up the listener by running the word "list"`);
      ns.tprint(`--------------------------------`);
      ns.tprint(`Warn: The listener script will not run alongside the main script with the starting RAM of 8Gb!`);
      ns.tprint(`Warn: SireNET advises RAM upgrade ASAP to avoid needing to kill and restart the listener constantly!`);
      ns.tprint(`-------------------------------------------------------------------------------------------------------------`);
    }
  }
}