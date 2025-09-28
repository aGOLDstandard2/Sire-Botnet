/** @param {NS} ns */
export async function main(ns) {
  const targ = ns.args[0];
  const host = ns.args[1];
  const msg = host + "/" + targ;
  await ns.hack(targ);
  ns.writePort(1, msg);
}