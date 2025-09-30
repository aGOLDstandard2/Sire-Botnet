import * as sire from "/utils/sireLib.js";
/** @param {NS} ns */
export async function main(ns) {

  // FOR DEBUG ONLY
  //ns.ui.openTail();

//-- Pre-Script --\\

//-- Flags:
  let flag = ns.flags([
    
    // logging:
    ["log", false],
    
    // attack modifiers:
    ["s", false],  
    ["small", false],
    ["m", false],
    ["medium", false],  // Arranges attackers based on RAM size.
    ["l", false], 
    ["large", false],
  ]);

  // Flag triggers:
  let smFlag = false;
  let mdFlag = false;
  let lgFlag = false;
  let logFlag = false;
  if (flag.s || flag.small) {
    smFlag = true;
    if (flag.s ) {
      ns.print(`INFO: Flag "s" set.`);        // Small Flags
    }
    if (flag.small) {
      ns.print(`INFO: Flag "small" set.`);
    }
  }
  if (flag.m || flag.medium) {
    mdFlag = true;
    if (flag.m) {
      ns.print(`INFO: Flag "m" set.`);        // Medium Flags
    }
    if (flag.medium) {
      ns.print(`INFO: Flag "medium" set.`);
    }
  }
  if (flag.l || flag.large) {
    lgFlag = true;
    if (flag.l) {
      ns.print(`INFO: Flag "l" set`);         // Large Flags
    }
    if (flag.large) {
      ns.print(`INFO: Flag "large" set.`)
    }
  }
  if (flag.log) {
    logFlag = true;
    ns.print(`INFO: Flag "log" set`);         // Log Flag
  }


// Definitions:
  
  // Flag IDs:
  const flagS = "-s" || "--small";
  const flagM = "-m" || "--medium";
  const flagL = "-l" || "--large";
  const flagLog = "--log";
  
  // File definitions:
  const h0sts = "/utils/guestBook.txt";
  const infoFile = "/utils/serverInfo.txt";
  const w0rms = ["/utils/w.js", "/utils/g.js", "/utils/h.js"];
  const w0rmsTarg = ["w.js", "g.js", "h.js"];

  // Initial declarations:
  let command = ns.args[0];
  let targ = ns.args[1];
  const me = "home";
  
  // Flag-In-Targ filter
  if (targ === "-s" || targ === "--small") {
    ns.print(`INFO: "targ" recognised as a flag.`);   // Small group flag filter
    ns.print(`INFO: Resetting "targ".`);
    targ = undefined;
    smFlag = true;
  }
  if (targ === "-m" || targ === "--medium") {
    ns.print(`INFO: "targ" recognised as a flag.`);   // Mid group flag filter
    ns.print(`INFO: Resetting "targ".`);
    targ = undefined
    mdFlag = true;
  }
  if (targ === "-l" || targ === "--large") {
    ns.print(`INFO: "targ" recognised as a flag.`);   // Large group flag filter
    ns.print(`INFO: Resetting "targ".`);
    targ = undefined;
    lgFlag = true;
  }
  if (targ === flagLog) {
    ns.print(`INFO: "targ" recognised as a flag.`);   // Log flag filter
    ns.print(`INFO: Resetting "targ".`);
    targ = undefined;
    logFlag = true;
  }

//-- Command Parsing --\\
// Naked Call error handling:
  const nakedCall = !command && targ === undefined;
  if (nakedCall) {
    ns.tprint(`ERROR: sire.js was ran with no arguments!`);
    ns.tprint(`Syntax: sire [command] [targ]`);
    ns.print(`ERROR: NakedCall.`);
    ns.print(`INFO: Printed error message to terminal.`);
  
    // Quit mssg
    ns.print(`WARN: Quitting.`);
    // Log-flag check
    if (flag.log) {
      sire.logger(ns, targ, command, flag);
    }
    ns.exit();
  }

// Unrecognized command error handling:
  const knownGood = ["crack", "attack", "feed", "tbath"];
  if (!knownGood.includes(command)) {
    ns.print(`ERROR: Unrecocnized command "${command}" entered.`);
    ns.tprint(`ERROR: Unrecocnized command "${command}" entered.`);
    ns.tprint(`ERROR: Syntax> sire [command] [target] [flags]`);
    
    // Quit mssg
    ns.print(`WARN: Quitting.`);
    if (flag.log) {                                  // Log-flag check
      sire.logger(ns, targ, command, flag);
    }
    ns.exit();
  }

// Crack:
  if (command === "crack") {
    
//-- Crack Util Pre-Checks -\\
    
    // If target is "n00dles", prompt user to clear hosts file:
    if (targ === "n00dles") {
      const resetCheck = await ns.prompt("Did you just reset or install augmentations?");
      
      // Reset if needed:
      if (resetCheck === true) {
        ns.print(`INFO: Reset detected. Wiping host file.`);
        ns.write(h0sts, "", "w");
        ns.write(infoFile, "", "w");
      }
    }
    ns.print(`INFO: Command "crack" registed.`);

    // Player level error handling:
    const playerLevel = ns.getHackingLevel();
    const targLevel = ns.getServerRequiredHackingLevel(targ);
    let lvlCheck = (playerLevel >= targLevel);
    if (!lvlCheck) {
      ns.tprint(`ERROR: Insufficient hacking level! See logs for more detail.`);
      ns.print(`ERROR: Insufficient hacking level.`);
      ns.print(`WARN: Hacking level needed: ${targLevel}`);
    
      // Quit mssg:
      ns.print(`WARN: Quitting.`);
      if (flag.log) {
        sire.logger(ns, targ, command, flag);
      }
      ns.exit();
    }

    // Already rooted error handling:
    ns.print(`INFO: Pre-check for root access in progress.`);
    const hasRoot = ns.hasRootAccess(targ);
    if (hasRoot) {
      ns.tprint(`ERROR: We already have root access on ${targ}!`);
      ns.print(`ERROR: We already have root access on ${targ}.`);
    
      // Quit mssg:
      ns.print(`WARN: Quitting.`);
      if (flag.log) {
        sire.logger(ns, targ, command, flag);
      }
      ns.exit();
    }

    // portEnum() error handling:
    const crackCounter = sire.portEnum(ns);
    const numPorts2Hack = ns.getServerNumPortsRequired(targ);
    let hackable = crackCounter >= numPorts2Hack || numPorts2Hack === 0;
    if (!hackable) {
      ns.tprint(`ERROR: You don't have the software needed to break into ${targ}. See logs for more info!`);
      ns.print(`ERROR: Required software check failed.`);
      ns.print(`INFO: Software required:`);

      // Determine and display missing softwares to logs:
      switch (!hackable) {
        case numPorts2Hack === 5:
        if (!ns.fileExists("SQLInject.exe")) {
          ns.print(`INFO: SQLInject.exe`);
        }
        case numPorts2Hack === 4:
        if (!ns.fileExists("HTTPWorm.exe")) {
          ns.print(`INFO: HTTPWorm.exe`);
        }
        case numPorts2Hack === 3:
        if (!ns.fileExists("relaySMTP.exe")) {
          ns.print(`INFO: relaySMTP.exe`);
        }
        case numPorts2Hack === 2:
        if (!ns.fileExists("FTPCrack.exe")) {
          ns.print(`INFO: FTPCrack.exe`);
        }
        case numPorts2Hack === 1:
        if (!ns.fileExists("BruteSSH.exe")) {
          ns.print(`INFO: BruteSSH.exe`);
        }
      
        // Shutdown notice:
        default:
        ns.print(`WARN: Quitting.`);
        if (flag.log) {
          sire.logger(ns, targ, command, flag);
        }
        ns.exit();
      }
    }

//-- Crack Util --\\
    // Port-Cracking util:
    ns.print(`INFO: Attempting to gain resource access on ${targ}!`);
    ns.tprint(`INFO: Attempting to gain resource access on ${targ}!`);
    sire.crack(ns, targ, numPorts2Hack);

//-- Crack Util Final Verification --\\
  ns.print(`INFO: Verifying root access.`);

  // Check for root access on targ:
  if (ns.hasRootAccess(targ)) {
    ns.print(`SUCCESS: Root access gained on ${targ}.`);
  } else {
    ns.print(`ERROR: Root access could not be verified. Starting retry loop.`);
    let retryCount = 0;
    const maxRetry = 3;
    while (!ns.hasRootAccess(targ) && retryCount < maxRetry) {
      ns.print(`INFO: Nuking ${targ}`);
      ns.nuke(targ);
      retryCount++;
      await ns.sleep(200);

      if (ns.hasRootAccess(targ)) {
        ns.tprint(`SUCCESS: ${targ} resources available!`);
        ns.print(`INFO: Root access gained on ${targ}.`);
      }

      if (retryCount === maxRetry) {
        ns.tprint(`ERROR: Nuke on target ${targ} failed! See logs for more info.`);
        ns.print(`ERROR: Unexpected error in root verification stage.`);
        ns.print(`WARN: Reached NUKE.exe retry limit.`);
        
        // Quit mssg
        ns.print(`WARN: Quitting.`);
        if (flag.log) {
          sire.logger(ns, targ, command, flag);
        }
        ns.exit();
      }
    }
  }
    
//-- Infection Util Pre-Checks --\\
    
    // No RAM error handling:
    if (ns.getServerMaxRam(targ) === 0) {
      ns.tprint(`ERROR: ${targ} is a 0 RAM server. Skipping.`);
      ns.print(`ERROR: ${targ} has RAM size of 0`);
      ns.print(`WARN: No need to infect ${targ}.`);
      ns.print(`WARN: Skipping.`);
      sire.infoPoll(ns, targ, infoFile);
    
      // Quit mssg
      ns.print(`WARN: Quitting.`);
      if (flag.log) {
       sire.logger(ns, targ, command, flag);
      }
      ns.exit();
    }

    // Already-Infected error handling:
    let hasW0rms = ns.fileExists(w0rms[0], targ) && ns.fileExists(w0rms[1], targ) && ns.fileExists(w0rms[2], targ);
    if (hasW0rms) {
      ns.tprint(`ERROR: ${targ} is already infected! See logs for more info!`);
      ns.print(`ERROR: We have already infected ${targ} with w0rm file.`);
      ns.print(`INFO: Checking for ${targ} in file refs.`);
      let h0stsCheck = ns.read(h0sts).includes(targ);
    
      // Double-Check hosts file:
      if (!h0stsCheck) {
        ns.print(`WARN: Target was infected, but not in file refs. Rectifying now.`);
        ns.write(h0sts, targ + ",", "a");
      } else {
        ns.print(`ERROR: Target is already infected and in file refs.`);
        
        // Quit mssg
        ns.print(`WARN: Quitting.`);
        if (flag.log) {
          sire.logger(ns, targ, command, flag);
        }
        ns.exit();
      }
    }

//-- Infection Util --\\
    ns.print(`INFO: Infecting ${targ}!`);
    ns.tprint(`INFO: Infecting ${targ}!`);
    await sire.infect(ns, h0sts, infoFile, w0rms, hasW0rms, w0rmsTarg, targ, command, flag);
    const servers = sire.broker(ns, infoFile);
    const serverInfo = servers.find(s => s.server === targ);

//-- Crack + Infection Final Verification --\\
    
    // Verify infection was successful
    ns.print(`INFO: Verifying successful infection of ${targ}.`);
    ns.print(`INFO: Verifying that root access was gained.`);
      
    if (ns.hasRootAccess(targ)) {
      ns.print(`INFO: Root access on ${targ} verified!`);
      ns.tprint(`SUCCESS: Root access gained on ${targ}`);    // Feedback if root was successful.
      ns.print(`INFO: Verifying ${targ} in host file.`);
        
      if (ns.read(h0sts).includes(targ)) {
        ns.print(`INFO: Infection on ${targ} verified!`);
        ns.tprint(`SUCCESS: Infected ${targ}!`);              // Feedback if infection was successful.
        ns.print(`INFO: Starting initial autophagic attack!`);
        let atkFile = w0rmsTarg[0];
        let atkRam = 1.75;
        let maxSpeed = Math.floor(serverInfo.maxRam / atkRam);
        ns.print(`INFO: Starting ${atkFile} file on ${targ} with ${maxSpeed} threads!`);
        ns.exec(atkFile, targ, maxSpeed, targ, targ);
      } else {
        ns.print(`ERROR: Infection was unsuccessful on ${targ}.`);  // Feedback if infection was unsuccessful.
        ns.tprint(`ERROR: Infection was unsuccessful on ${targ}.`);
      }
    } else {
      ns.print(`ERROR: Root access could not be verified on ${targ}.`);  // Feedback if root was unsuccessful.
      ns.tprint(`ERROR: Root access could not be verified on ${targ}.`);
    }

    // Quit mssg
    ns.print(`WARN: Quitting.`);
    if (flag.log) {                                  // Log-flag check
      sire.logger(ns, targ, command, flag);
    }
    ns.exit();
  }

// Attack (distributed):
  if (command === "attack") {
    const noGroups = !smFlag && !mdFlag && !lgFlag;
    const allH0sts = sire.hostEnum(ns, h0sts);
    const servers = sire.broker(ns, infoFile);
    if (targ === undefined) {
      ns.write("/utils/lkt.txt", "", "w");
      ns.print(`INFO: Command "attack" was registered with no target.`);
      ns.tprint(`INFO: Starting autophagic attack!`);
      ns.print(`INFO: Starting autophagic attack.`);      // Host enumeration for undefined targ

      // No-host error handling:
      if (allH0sts.length === 0) {
        ns.tprint(`ERROR: You haven't infected any servers yet!`);
        ns.print(`ERROR: You haven't infected any servers yet!`);
        ns.print(`WARN: Quitting.`);
        if (flag.log) {
          sire.logger(ns, targ, command, flag);
        }
        ns.exit();
      } else {
        ns.print(`INFO: Host enumeration complete`);
      
        // Distribute attack across all infected hosts:
        if (noGroups) {
          ns.print(`INFO: Host enumeration complete.`);
          ns.print(`INFO: No grouping flag selected.`);
          ns.print(`INFO: Starting distributed attack against all infected hosts.`);
          sire.distAtk(ns, w0rmsTarg, servers, allH0sts);
          ns.print(`SUCCESS: Distributed self targetting attacks over all (${allH0sts.length}) hosts.`);
          ns.tprint(`SUCCESS: Distributed self targetting attacks over all (${allH0sts.length}) hosts.`);
        }

        // Low RAM only:
        if (smFlag) {
          const smH0sts = sire.hostGroups(ns, allH0sts).sm;
          ns.print(`INFO: Host enumeration complete.`);
          ns.print(`INFO: Grouping flag for "Low RAM Hosts" used.`);
          ns.print(`INFO: Starting distributed attack against low RAM hosts.`);
          sire.distAtk(ns, w0rmsTarg, servers, smH0sts);
          ns.print(`SUCCESS: Distributed self targetting attacks over (${smH0sts.length}) low RAM hosts.`);
          ns.tprint(`SUCCESS: Distributed self targetting attacks over (${smH0sts.length}) low RAM hosts.`);
        }
      
        // Mid-tier RAM only:
        if (mdFlag){
          const mdH0sts = sire.hostGroups(ns, allH0sts).md;
          ns.print(`INFO: Host enumeration complete.`);
          ns.print(`INFO: Grouping flag for "Mid-Tier RAM Hosts" used.`);
          ns.print(`INFO: Starting distributed attack against mid-tier RAM hosts.`);
          sire.distAtk(ns, w0rmsTarg, servers, mdH0sts);
          ns.print(`SUCCESS: Distributed self targetting attacks over (${mdH0sts.length}) mid-tier RAM hosts.`);
          ns.tprint(`SUCCESS: Distributed self targetting attacks over (${mdH0sts.length}) mid-tier RAM hosts.`);
        }

        // High RAM only:
        if (lgFlag) {
          const lgH0sts = sire.hostGroups(ns, allH0sts).lg;
          ns.print(`INFO: Host enumeration complete.`);
          ns.print(`INFO: Grouping flag for "High RAM Hosts" used.`);
          ns.print(`INFO: Starting distributed attack against high RAM hosts.`);
          sire.distAtk(ns, w0rmsTarg, servers, lgH0sts);
          ns.print(`SUCCESS: Distributed self targetting attacks over (${lgH0sts.length}) high RAM hosts.`);
          ns.tprint(`SUCCESS: Distributed self targetting attacks over (${lgH0sts.length}) high RAM hosts.`);
        }
      }
    }

// Attack (focused):
    if (targ !== undefined) {
      ns.print(`INFO: Command "attack" was registered with target "${targ}".`);
      ns.tprint(`INFO: Starting focused attack on ${targ}!`);
      ns.print(`INFO: Starting focused attack on ${targ}.`);      // Host enumeration for defined targets.
      ns.write("/utils/lkt.txt", targ, "w");

      // Focus all infected hosts against targ
      if (noGroups) {
        ns.print(`INFO: Host enumeration complete.`);
        ns.print(`INFO: No grouping flag selected.`);
        ns.print(`INFO: Focusing all infected hosts on attacking ${targ}.`);
        sire.focusAtk(ns, targ, w0rmsTarg, infoFile, allH0sts);
        ns.print(`SUCCESS: Focused all (${allH0sts.length}) hosts on attacking ${targ}.`);
        ns.tprint(`SUCCESS: Focused all (${allH0sts.length}) hosts on attacking ${targ}.`);
      }

      // Focus only low RAM group against targ:
      if (smFlag) {
        const smH0sts = sire.hostGroups(ns, allH0sts).sm;
        ns.print(`INFO: Host enumeration complete.`);
        ns.print(`INFO: Grouping flag for "Low RAM Hosts" used.`);
        ns.print(`INFO: Focusing all infected low RAM hosts on attacking ${targ}.`);
        sire.focusAtk(ns, targ, w0rmsTarg, infoFile, smH0sts);
        ns.print(`SUCCESS: Focused all (${smH0sts.length}) low RAM hosts on attacking ${targ}.`);
        ns.tprint(`SUCCESS: Focused all (${smH0sts.length}) low RAM hosts on attacking ${targ}.`);
      }

      // Focus only mid-tier RAM group against targ:
      if (mdFlag) {
        const mdH0sts = sire.hostGroups(ns, allH0sts).md;
        ns.print(`INFO: Host enumeration complete.`);
        ns.print(`INFO: Grouping flag for "Mid-Tier RAM Hosts" used.`);
        ns.print(`INFO: Focusing all infected mid-tier RAM hosts on attacking ${targ}.`);
        sire.focusAtk(ns, targ, w0rmsTarg, infoFile, mdH0sts);
        ns.print(`SUCCESS: Focused all (${mdH0sts.length}) mid-tier RAM hosts on attacking ${targ}.`);
        ns.tprint(`SUCCESS: Focused all (${mdH0sts.length}) mid-tier RAM hosts on attacking ${targ}.`);
      }

      // Focus only high RAM group against targ:
      if (lgFlag) {
        const lgH0sts = sire.hostGroups(ns, allH0sts).lg;
        ns.print(`INFO: Host enumeration complete.`);
        ns.print(`INFO: Grouping flag for "High RAM Hosts" used.`);
        ns.print(`INFO: Focusing all infected high RAM hosts on attacking ${targ}.`);
        sire.focusAtk(ns, targ, w0rmsTarg, infoFile, lgH0sts);
        ns.print(`SUCCESS: Focused all (${lgH0sts.length}) high RAM hosts on attacking ${targ}.`);
        ns.tprint(`SUCCESS: Focused all (${lgH0sts.length}) high RAM hosts on attacking ${targ}.`);
      }
    }

    // Quit mssg
    ns.print(`WARN: Quitting.`);
    if (flag.log) {                                  // Log-flag check
      sire.logger(ns, targ, command, flag);
    }
    ns.exit();
  }

// Tbath:
  if (command === "tbath") {
    ns.print(`INFO: Killing all processes across all hosts.`);
    const allH0sts = sire.hostEnum(ns, h0sts);
    for (let i = 0; i < allH0sts.length; i++) {
      ns.print(`INFO: Killing all processes on ${allH0sts[i]}`);
      ns.killall(allH0sts[i]);
    }
    ns.print(`SUCCESS: Successfully killed all processes on (${allH0sts.length}) hosts.`);
    ns.tprint(`SUCCESS: Successfully killed all processes on (${allH0sts.length}) hosts.`);
    
    // Quit mssg
    ns.print(`WARN: Quitting.`);
    if (flag.log) {                                  // Log-flag check
      sire.logger(ns, targ, command, flag);
    }
    ns.exit();
  }
}