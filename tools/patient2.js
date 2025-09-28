/** @param {NS} ns */
export async function main(ns) {
  const hosts = "/utils/guestBook.txt";
  const hostList = ns.read(hosts).split(",").filter(host => host.trim() !== "");
  for (let i = 0; i < hostList.length; i++) {
    let money = ns.getServerMoneyAvailable(hostList[i]);
    ns.tprint(`${hostList[i]} has ${money} moneys available.`);
  }
}