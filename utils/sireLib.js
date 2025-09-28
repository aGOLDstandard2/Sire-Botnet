/** @param {NS} ns */

      //---------------------------------------------------------------------------------------------\\
     //------------------------------------------ hostEnum() -----------------------------------------\\
    //-----------------------------------(infected host enumeration)-----------------------------------\\

export function hostEnum(ns, h0sts, flag) {

  // Reads host file and creates an array
  ns.print(`INFO: Lib.hostEnum(): Reading host list.`);
  const allH0sts = ns.read(h0sts).split(",").filter(host => host.trim() !== "");
  ns.print(`INFO: Lib.hostEnum(): Host Enumeration complete.`);
  return allH0sts; // Returns allH0sts array: 
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //---------------------------------------- hostGroups() -----------------------------------------\\
    //------------------------------------(devides allH0sts by RAM)------------------------------------\\
    
export function hostGroups(ns, allH0sts) {
    
  // Initialize an array for each RAM size:
  ns.print(`INFO: Lib.hostGroups(): Initializing grouping arrays.`);
  const smH0sts = [];
  const mdH0sts = [];
  const lgH0sts = [];
    
  // Iterate through allH0sts and push to new arrays based on RAM size:
  for (let i = 0; i < allH0sts.length; i++) {
    ns.print(`INFO: Lib.hostGroups(): Tabulating max RAM for ${allH0sts[i]}.`);
    const targRam = ns.getServerMaxRam(allH0sts[i])
    if (targRam <= 16) {
      ns.print(`INFO: Lib.hostGroups(): ${allH0sts[i]} has ${targRam} RAM.`);
      ns.print(`INFO: Lib.hostGroups(): Pushing ${allH0sts[i]} to low RAM group`);
      smH0sts.push(allH0sts[i]);                                            // Low RAM hosts
    }
    if (targRam > 16 && targRam <= 64) {
      ns.print(`INFO: Lib.hostGroups(): ${allH0sts[i]} has ${targRam} RAM.`);
      ns.print(`INFO: Lib.hostGroups(): Pushing ${allH0sts[i]} to mid-tier RAM group`);
      mdH0sts.push(allH0sts[i]);                                            // Mid-tier RAM hosts
    }
    if (targRam > 64){
      ns.print(`INFO: Lib.hostGroups(): ${allH0sts[i]} has ${targRam} RAM.`);
      ns.print(`INFO: Lib.hostGroups(): Pushing ${allH0sts[i]} to high RAM group`);
      lgH0sts.push(allH0sts[i]);                                            // High RAM hosts
    }
  }
    
  // Returns specified host groups:
  return {
    sm: smH0sts,
    md: mdH0sts,
    lg: lgH0sts,
  };
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //------------------------------------------ distAtk() ------------------------------------------\\
    //------------------------------------(distributed attack plan)------------------------------------\\
    
export function distAtk(ns, w0rmsTarg, servers, allH0sts, smH0sts, mdH0sts, lgH0sts) {
      
// Distributed attack across groups:
  if (!allH0sts){
    if (smH0sts) {
      for (let i = 0; i < smH0sts.length; i++) {
        const targ = smH0sts[i];
        const serverInfo = servers.find(s => s.server === targ);
        let atkFile = "";
        let atkRam = 0;
        if (ns.getServerSecurityLevel(targ) > serverInfo.minSec) {
          atkFile = w0rmsTarg[0];
          atkRam = 1.75;
        } else if (ns.getServerMoneyAvailable(targ) < serverInfo.maxCash) {           // Low RAM hosts
          atkFile = w0rmsTarg[1];
          atkRam = 1.75;
        } else {
          atkFile = w0rmsTarg[2];
          atkRam = 1.70;
        }
        ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${targ}`);
        let maxSpeed = Math.floor(serverInfo.maxRam / atkRam);
        ns.print(`INFO: Lib.distAtk(): Killing all processes on ${targ}`);
        ns.killall(targ);
        ns.print(`INFO: Lib.distAtk(): Starting attack script on ${targ}`);
        ns.exec(atkFile, targ, maxSpeed, targ, targ);
        ns.print(`INFO: Lib.distAtk(): Started attack script on ${targ} with ${maxSpeed} threads!`);
      }
    }
    if (mdH0sts) {
      for (let i = 0; i < mdH0sts.length; i++) {
        let targ = mdH0sts[i];
        const serverInfo = servers.find(s => s.server === targ);
        let atkFile = "";
        let atkRam = 0;
        if (ns.getServerSecurityLevel(targ) > serverInfo.minSec) {
          atkFile = w0rmsTarg[0];
          atkRam = 1.75;
        } else if (ns.getServerMoneyAvailable(targ) < serverInfo.maxCash) {           // Mid-teir RAM hosts
          atkFile = w0rmsTarg[1];
          atkRam = 1.75;
        } else {
          atkFile = w0rmsTarg[2];
          atkRam = 1.70;
        }
        ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${targ}`);
        const maxSpeed = Math.floor(serverInfo.maxRam / atkRam);
        ns.print(`INFO: Lib.distAtk(): Killing all processes on ${targ}`);
        ns.killall(targ);
        ns.print(`INFO: Lib.distAtk(): Starting attack script on ${targ}`);
        ns.exec(atkFile, targ, maxSpeed, targ, targ);
        ns.print(`INFO: Lib.distAtk(): Started attack script on ${mdH0sts[i]} with ${maxSpeed} threads!`);
      }
    }
    if (lgH0sts) {
      for (let i = 0; i < lgH0sts.length; i++) {
        let targ = lgH0sts[i];
        const serverInfo = servers.find(s => s.server === targ);
        let atkFile = "";
        let atkRam = 0;
        if (ns.getServerSecurityLevel(targ) > serverInfo.minSec) {
          atkFile = w0rmsTarg[0];
          atkRam = 1.75;
        } else if (ns.getServerMoneyAvailable(targ) < serverInfo.maxCash) {           // Large RAM hosts
          atkFile = w0rmsTarg[1];
          atkRam = 1.75;
        } else {
          atkFile = w0rmsTarg[2];
          atkRam = 1.70;
        }
        ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${targ}`);
        const maxSpeed = Math.floor(serverInfo.maxRam / atkRam);
        ns.print(`INFO: Lib.distAtk(): Killing all processes on ${targ}`);
        ns.killall(targ);
        ns.print(`INFO: Lib.distAtk(): Starting attack script on ${targ}`);
        ns.exec(atkFile, targ, maxSpeed, targ, targ);
        ns.print(`INFO: Lib.distAtk(): Started attack script on ${lgH0sts[i]} with ${maxSpeed} threads!`);
      }
    }
      
// Full distributed attack (all hosts):
  } else {
    for (let i = 0; i < allH0sts.length; i++) {
      let targ = allH0sts[i];
      const serverInfo = servers.find(s => s.server === targ);
      let atkFile = "";
      let atkRam = 0;
      if (ns.getServerSecurityLevel(targ) > serverInfo.minSec) {
        atkFile = w0rmsTarg[0];
        atkRam = 1.75;
      } else if (ns.getServerMoneyAvailable(targ) < serverInfo.maxCash) {           // All hosts
        atkFile = w0rmsTarg[1];
        atkRam = 1.75;
      } else {
        atkFile = w0rmsTarg[2];
        atkRam = 1.70;
      }
      ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${targ}`);
      const maxSpeed = Math.floor(serverInfo.maxRam / atkRam);
      ns.print(`INFO: Lib.distAtk(): Killing all processes on ${targ}`);
      ns.killall(targ);
      ns.print(`INFO: Lib.distAtk(): Starting attack script on ${targ}`);
      ns.exec(atkFile, targ, maxSpeed, targ, targ);
      ns.print(`INFO: Lib.distAtk(): Started attack script on ${allH0sts[i]} with ${maxSpeed} threads!`);
    }
  }
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //----------------------------------------- focusAtk() ------------------------------------------\\
    //--------------------------------------(focused attack plan)--------------------------------------\\
    
export function focusAtk(ns, targ, w0rmsTarg, infoFile, allH0sts, smH0sts, mdH0sts, lgH0sts) {
  const servers = broker(ns, infoFile);
// Groups focused attack:
  if (!allH0sts){
    if (smH0sts) {
      for (let i = 0; i < smH0sts.length; i++) {
        const host = smH0sts[i];
        const hostInfo = servers.find(s => s.server === host);
        const targInfo = servers.find(s => s.server === targ);
        let atkFile = "";
        let atkRam = 0;
        if (ns.getServerSecurityLevel(targ) > targInfo.minSec) {
          atkFile = w0rmsTarg[0];
          atkRam = 1.75;
        } else if (ns.getServerMoneyAvailable(targ) < targInfo.maxCash) {           // Low RAM hosts
          atkFile = w0rmsTarg[1];
          atkRam = 1.75;
        } else {
          atkFile = w0rmsTarg[2];
          atkRam = 1.70;
        }
        ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${host}`);
        const maxSpeed = Math.floor(hostInfo.maxRam / atkRam);
        ns.print(`INFO: Lib.focusAtk(): Killing all processes on ${host}`);
        ns.killall(host);
        ns.print(`INFO: Lib.focusAtk(): Starting attack script on ${host} at ${targ}`);
        ns.exec(atkFile, host, maxSpeed, targ, host);
        ns.print(`INFO: Lib.focusAtk(): Started attack script on ${host} with ${maxSpeed} threads against ${targ}!`);
      }
    }
    if (mdH0sts) {
      for (let i = 0; i < mdH0sts.length; i++) {
        let host = mdH0sts[i];
        const hostInfo = servers.find(s => s.server === host);
        const targInfo = servers.find(s => s.server === targ);
        let atkFile = "";
        let atkRam = 0;
        if (ns.getServerSecurityLevel(targ) > targInfo.minSec) {
          atkFile = w0rmsTarg[0];
          atkRam = 1.75;
        } else if (ns.getServerMoneyAvailable(targ) < targInfo.maxCash) {           // Mid-tier RAM hosts
          atkFile = w0rmsTarg[1];
          atkRam = 1.75;
        } else {
          atkFile = w0rmsTarg[2];
          atkRam = 1.70;
        }
        ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${host}`);
        const maxSpeed = Math.floor(hostInfo.maxRam / atkRam);
        ns.print(`INFO: Lib.focusAtk(): Killing all processes on ${host}`);
        ns.killall(host);
        ns.print(`INFO: Lib.focusAtk(): Starting attack script on ${host} at ${targ}`);
        ns.exec(atkFile, host, maxSpeed, targ, host);
        ns.print(`INFO: Lib.focusAtk(): Started attack script on ${host} with ${maxSpeed} threads against ${targ}!`);
      }
    }
    if (lgH0sts) {
      for (let i = 0; i < lgH0sts.length; i++) {
        let host = lgH0sts[i];
        const hostInfo = servers.find(s => s.server === host);
        const targInfo = servers.find(s => s.server === targ);
        let atkFile = "";
        let atkRam = 0;
        if (ns.getServerSecurityLevel(targ) > targInfo.minSec) {
          atkFile = w0rmsTarg[0];
          atkRam = 1.75;
        } else if (ns.getServerMoneyAvailable(targ) < targInfo.maxCash) {           // High RAM hosts
          atkFile = w0rmsTarg[1];
          atkRam = 1.75;
        } else {
          atkFile = w0rmsTarg[2];
          atkRam = 1.70;
        }
        ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${host}`);
        const maxSpeed = Math.floor(hostInfo.maxRam / atkRam);
        ns.print(`INFO: Lib.focusAtk(): Killing all processes on ${host}`);
        ns.killall(host);
        ns.print(`INFO: Lib.focusAtk(): Starting attack script on ${host} at ${targ}`);
        ns.exec(atkFile, host, maxSpeed, targ, host);
        ns.print(`INFO: Lib.focusAtk(): Started attack script on ${host} with ${maxSpeed} threads against ${targ}!`);
      }
    }
      
// Full focused attack (all hosts):
  } else {
    for (let i = 0; i < allH0sts.length; i++) {
      let host = allH0sts[i];
      const hostInfo = servers.find(s => s.server === host);
      const targInfo = servers.find(s => s.server === targ);
      let atkFile = "";
      let atkRam = 0;
      if (ns.getServerSecurityLevel(targ) > targInfo.minSec) {
        atkFile = w0rmsTarg[0];
        atkRam = 1.75;
      } else if (ns.getServerMoneyAvailable(targ) < targInfo.maxCash) {           // All hosts
        atkFile = w0rmsTarg[1];
        atkRam = 1.75;
      } else {
        atkFile = w0rmsTarg[2];
        atkRam = 1.70;
      }
      ns.print(`INFO: Lib.distAtk(): Calculating thread speed for ${host}`);
      const maxSpeed = Math.floor(hostInfo.maxRam / atkRam);
      ns.print(`INFO: Lib.focusAtk(): Killing all processes on ${host}`);
      ns.killall(host);
      ns.print(`INFO: Lib.focusAtk(): Starting attack script on ${host} at ${targ}`);
      ns.exec(atkFile, host, maxSpeed, targ, host);
      ns.print(`INFO: Lib.focusAtk(): Started attack script on ${host} with ${maxSpeed} threads against ${targ}!`);
    }
  }
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //------------------------------------------- logger() ------------------------------------------\\
    //------------------------------------(simple log writing util)------------------------------------\\
    
export function logger(ns, targ, command, flag) {
      
  // Hr/min translator:
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  if (hour === 0) {
    hour = 12
  }
  if (hour >= 13) {
    hour = hour - 12;
    minute = minute + "-PM"
  } else {
    minute = minute + "-AM"
  }
      
  // titleMssg1 translator:
  let titleMssg1 = "";
  if (targ !== undefined) {
    if (!command) {
      titleMssg1 = `${targ.toUpperCase()}-(` + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    } else {
      titleMssg1 = `${command.toUpperCase()}-${targ}-(` + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    }
  } else {
    if (!command) {
      titleMssg1 = `TEST-(` + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    } else {
      titleMssg1 = `${command.toUpperCase()}-(` + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    }
  }
      
  // Finishes name building:
  const titleMssg2 = hour + ":" + minute + ")";
  const currentScript = ns.getScriptName();
  const scriptArgs = ns.args;
  const logs = ns.getScriptLogs(currentScript, "home", ...scriptArgs);
  const scriptName = currentScript.split(".js");
  const logName = "/logs/" + titleMssg1 + "_@" + titleMssg2 + scriptName[0] + "Log.txt";
      
  // Writer:
  ns.print(`INFO: Lib.logger(): Writing log file.`);
  for (let i = 0; i < logs.length; i++) {
    ns.write(logName, logs[i] + "\n", "a");
  }
    
  // User feedback:
  ns.tprint(`INFO: Check logs at: ` + logName);
}
      
    
      //---------------------------------------------------------------------------------------------\\
     //----------------------------------------- portEnum() ------------------------------------------\\
    //-----------------------------------(port-cracker enumeration)------------------------------------\\
    
export function portEnum(ns){
  const hasBrute = ns.fileExists("BruteSSH.exe");
  const hasCrack = ns.fileExists("FTPCrack.exe");
  const hasRelay = ns.fileExists("relaySMTP.exe");
  const hasWorm = ns.fileExists("HTTPWorm.exe");
  const hasSQL = ns.fileExists("SQLInject.exe");
      
  // Port Cracker Counter:
  let crackCounter = 0;
  if (hasBrute) {
    crackCounter++;
  }
  if (hasCrack) {
    crackCounter++;
  }
  if (hasRelay) {
    crackCounter++;
  }
  if (hasWorm) {
    crackCounter++;
  }
  if (hasSQL) {
    crackCounter++;
  }

  return crackCounter;
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //------------------------------------------- crack() -------------------------------------------\\
    //----------------------------(root exploitation and infection utility)----------------------------\\
    
export function crack(ns, targ, numPorts2Hack) {
  if (numPorts2Hack === 1) {
    ns.print(`INFO: Lib.crack(): Cracking ${targ}'s SSH port.`);
  }
  if (numPorts2Hack > 1){
    ns.print(`INFO: Lib.crack(): Cracking ${targ}'s ${numPorts2Hack} ports.`);
  }
  switch (true) {
    case numPorts2Hack === 5:
      ns.sqlinject(targ);
    case numPorts2Hack === 4:
      ns.httpworm(targ);
    case numPorts2Hack === 3:  
      ns.relaysmtp(targ);
    case numPorts2Hack === 2:
      ns.ftpcrack(targ);
    case numPorts2Hack === 1:
      ns.brutessh(targ);
    default:
      ns.print(`INFO: Lib.crack(): Nuking ${targ} for root access. Standby...`);
      ns.nuke(targ);
  }
}
      
      
      //---------------------------------------------------------------------------------------------\\
     //---------------------------------------- infect(async) ----------------------------------------\\
    //---------------------------------(infection and hosts mgmt util)---------------------------------\\
      
      
export async function infect(ns, h0sts, infoFile, w0rms, hasW0rms, w0rmsTarg, targ, command, flag) {
      
  // Run verification loop for worm files:
  ns.print(`INFO: Lib.infect(): Transferring w0rm files.`);
      
  // Stop counter (3):
  let retryCount = 0;
  const maxRetry = 5;
  while (!hasW0rms && retryCount < maxRetry) {
    ns.scp(w0rms, targ);
    ns.mv(targ, w0rms[0], w0rmsTarg[0]);
    ns.mv(targ, w0rms[1], w0rmsTarg[1]);
    ns.mv(targ, w0rms[2], w0rmsTarg[2]);
    await ns.sleep(100);
            
    // Stop if files are recognized:
    if (ns.fileExists(w0rmsTarg[0], targ) && ns.fileExists(w0rmsTarg[1], targ) && ns.fileExists(w0rmsTarg[2], targ)) {
      ns.print(`INFO: Lib.infect(): File upload complete. Checking host file for ${targ} to avoid duplicate entries.`);
    
      // Avoid duplicates from being added to hosts file:
      if (!ns.read(h0sts).includes(targ)) {
        ns.write(h0sts, targ + ",", "a");
        ns.tprint(`SUCCESS: ${targ} successfully infected.`);
      }
      if (!ns.read(infoFile).includes(targ)) {
        infoPoll(ns, targ, infoFile);
      }
      hasW0rms = true;
    } else {
      retryCount++
    }
    
    // Stop if max retry is hit:
    if (retryCount === maxRetry) {
      ns.tprint(`ERROR: Could not infect ${targ}. See logs for more info.`);
      ns.print(`ERROR: Lib.infect(): Could not infect ${targ}. Max Retry reached.`);
              
      // Quit mssg
      ns.print(`WARN: Lib.infect(): Quitting.`);
      if (flag.log) {
        logger(ns, targ, command, flag);
      }
      ns.exit();
    }
  }
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //----------------------------------------- broker() --------------------------------------------\\
    //--------------------------------(reads JSON content for servers)---------------------------------\\
    
export function broker(ns, infoFile) {
  // Read the contents of the JSON file
  const content = ns.read(infoFile);
  if (!content) {
    ns.tprint(`The file ${infoFile} is empty or does not exist.`);
    return;
  }
    
  try {
    return JSON.parse(content);
  } catch (e) {
    ns.tprint(`Error parsing JSON from ${infoFile}:`);
    ns.tprint(`${e}`);
    return;
  }
}
    
    
      //---------------------------------------------------------------------------------------------\\
     //------------------------------------------ infoPoll() -----------------------------------------\\
    //-----------------------------(concatenates target info to JSON txt)------------------------------\\
    
export function infoPoll(ns, targ, infoFile) {
  // Prepare the new server info object
  const newServerInfo = {
    server: targ,
    maxRam: ns.getServerMaxRam(targ),
    maxCash: ns.getServerMaxMoney(targ),
    minSec: ns.getServerMinSecurityLevel(targ)
  };
    
  // Read current file contents
  let content = ns.read(infoFile);
  let servers = [];
    
  if (content) {
    try {
      servers = JSON.parse(content);
      if (!Array.isArray(servers)) {
        // If JSON content is not an array, reset to empty array
        servers = [];
      }
    } catch (e) {
      ns.tprint(`Warning: Failed to parse ${infoFile} as JSON. Starting with a fresh array.`);
      servers = [];
    }
  }
    
  // Check if server is already in the array
  const existingIndex = servers.findIndex(s => s.server === targ);
  if (existingIndex !== -1) {
    // Update existing server info
    servers[existingIndex] = newServerInfo;
  } else {
    // Append new server info
    servers.push(newServerInfo);
  }
    
  // Write updated JSON array back to file
  ns.write(infoFile, JSON.stringify(servers, null, 2), "w");
  ns.tprint(`Updated ${infoFile} with information for ${targ}`);
}