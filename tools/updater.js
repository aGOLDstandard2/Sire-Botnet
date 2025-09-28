/** @param {NS} ns */
import {hostEnum} from "/utils/sireLib.js"
export async function main(ns) {
  ns.ui.openTail()
  const h0sts = "/utils/guestBook.txt"
  const allH0sts = hostEnum(ns, h0sts);
  const w0rms = ["/utils/w.js", "/utils/g.js", "/utils/h.js"];
  for (let i = 0; i < allH0sts.length; i++) {
    ns.scp(w0rms, allH0sts[i]);
  }
}