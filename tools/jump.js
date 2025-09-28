/** @param {NS} ns */
import { hostEnum, broker } from "/utils/sireLib.js";
//import {broker} from "sireLib.js";
export async function main(ns) {
  const h0sts = "/utils/guestBook.txt";
  const infoFile = "/utils/serverInfo.txt";
  const host = hostEnum(ns, h0sts);
  const w0rms = ["w.js", "g.js", "h.js"];

  for (let i = 0; i < host.length; i++) {
    let targ = ns.args[0]
    if (targ === undefined) {
      targ = host[i];
    }
    let running = false;
    if (ns.isRunning(w0rms[0], host[i]) || ns.isRunning(w0rms[1], host[i]) || ns.isRunning(w0rms[2], host[i])) {
      running = true
    }
    if (!running) {
      const servers = broker(ns, infoFile);
      const hostInfo = servers.find(s => s.server === host[i]);
      const targInfo = servers.find(s => s.server === targ);
      let atkFile = "";
      let atkRam = 0;
      if (ns.getServerSecurityLevel(targ) > targInfo.minSec) {
        atkFile = w0rms[0];
        atkRam = 1.75;
      } else if (ns.getServerMoneyAvailable(targ) < targInfo.maxCash) {
        atkFile = w0rms[1];
        atkRam = 1.75;
      } else {
        atkFile = w0rms[2]
        atkRam = 1.70;
      }
      const speed = Math.floor(hostInfo.maxRam / atkRam);
      ns.exec(atkFile, host[i], speed, targ, host[i]);
    }
  }
}