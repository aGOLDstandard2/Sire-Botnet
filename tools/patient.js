/** @param {NS} ns */
export async function main(ns) {
  let targ = ns.args[0];
  if (targ === undefined) {
    targ = "home";
  }
  const secLvl = ns.getServerSecurityLevel(targ);
  const minSec = ns.getServerMinSecurityLevel(targ);
  const cash = ns.getServerMoneyAvailable(targ);
  const maxCash = ns.getServerMaxMoney(targ);
  const ram = ns.getServerMaxRam(targ);
  const usedRam = ns.getServerUsedRam(targ);
  const freeRam = ram - usedRam;
  const script = "/utils/strig.js";
  const scriptArgs = ns.args;
  const scriptLogs = ns.getScriptLogs(script, targ, ...scriptArgs);
  const lastLog = scriptLogs.pop()
  ns.tprint(`------------------------------------------------------`);
  ns.tprint(`--------------------Patient Chart:--------------------`);
  ns.tprint(`------------------------------------------------------`);
  ns.tprint(`Name:`);
  ns.tprint(`${targ}`);
  ns.tprint(``);
  ns.tprint(`Security Level:`);
  ns.tprint(`-Current: ${secLvl}`);
  ns.tprint(`-Minimum: ${minSec}`);
  ns.tprint(``);
  ns.tprint(`Monetary Value:`);
  ns.tprint(`-Current: $${cash}`);
  ns.tprint(`-Maximum: $${maxCash}`);
  ns.tprint(``);
  ns.tprint(`RAM use:`);
  ns.tprint(`-Total: ${ram}Gb`);
  ns.tprint(`-Used: ${usedRam}Gb`);
  ns.tprint(`-Free: ${freeRam}Gb`);
  ns.tprint(``);
  ns.tprint(`Script last log:`);
  ns.tprint(``);
  ns.tprint(`${lastLog}`);
  ns.tprint(`------------------------------------------------------`);
  ns.tprint(`------------------------------------------------------`);
}