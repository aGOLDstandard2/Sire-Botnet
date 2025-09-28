/** @param {NS} ns */
export async function main(ns) {
  const targ = ns.args[0];
  const host = ns.args[1];
  const msg = host + "/" + targ;
  await ns.grow(targ);
  ns.writePort(1, msg);
}