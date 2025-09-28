/** @param {NS} ns */
export async function main(ns) {
  ns.clearPort(1);
  ns.run("/tools/listener.js");
}