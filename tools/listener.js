/** @param {NS} ns */
import { broker } from "/utils/sireLib.js";
export async function main(ns) {
  const w0rms = ["w.js", "g.js", "h.js"];
  const infoFile = "/utils/serverInfo.txt";
  while (true) {

    // We poll port[1] once per second until we get a message in.
    const offline = 60;
    let stopwatch = 0;
    while (ns.peek(1) === "NULL PORT DATA") {
      await ns.sleep(1000);

      // Offline checker
      stopwatch++
      if (stopwatch >= offline) {
        clearInterval(stopwatch);
        const lkt = ns.read("/utils/lkt.txt");
        if (lkt === "") {
          ns.exec("/tools/jump.js", "home", 1);
        } else {
          ns.exec("/tools/jump.js", "home", 1, lkt);
        }
      }
    }
    await ns.sleep(100);
    clearInterval(stopwatch);

    // Once we get a message in, we need to break it into hostname and targ
    const msg = ns.readPort(1).split("/");
    const host = msg[0];
    const targ = msg[1];

    // Parse server info JSON
    const servers = broker(ns, infoFile);
    const hostInfo = servers.find(s => s.server === host);
    const maxRam = hostInfo.maxRam;
    const targInfo = servers.find(s => s.server === targ);
    const maxCash = targInfo.maxCash;
    const minSec = targInfo.minSec;

    // Then asses targ's stats, and assign atkFile
    let atkFile = "";
    let atkRam = 0;
    let running = false;
    if (ns.isRunning(w0rms[0], host) || ns.isRunning(w0rms[1], host) || ns.isRunning(w0rms[2], host)) {
      running = true
    }
    if (!running) {
      if (ns.getServerSecurityLevel(targ) > minSec) {
        atkFile = w0rms[0];
        atkRam = 1.75;
      } else if (ns.getServerMoneyAvailable(targ) < maxCash) {
        atkFile = w0rms[1];
        atkRam = 1.75;
      } else {
        atkFile = w0rms[2];
        atkRam = 1.70;
      }

      // Calculate max threads and run the atkFile
      const speed = Math.floor(maxRam / atkRam);
      ns.exec(atkFile, host, speed, targ, host);
    }
  }
}