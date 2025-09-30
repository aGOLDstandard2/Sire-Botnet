# Sire-Botnet
**New home of the SireNET Botnet, for the game BitBurner!**

SireNET is an easy-to-use botnet script, that can be entirely run on the game's starting RAM of 8Gb. *(Although, upgrading your RAM is strongly recommended.)* The botnet is capable of having infected targets attack their own resources (autophagia), or each other. Targetting can currently be "all together" or in groups based on RAM sizes. It utilizes super simple scripts run on infected hosts, and BitBurner's networking to facilitate attack logic. When networking is down (aka: not playing the game), the same logic is applied on a timer.

<br>

***Note:** Since some things are still in testing, tails() have been added to many of the scripts; they will be removed as soon as testing is complete.*

---

## Quickstart Guide:

To get started, copy and paste the following into your in-game terminal to download the installer:
```
wget https://raw.githubusercontent.com/aGOLDstandard2/Sire-Botnet/main/installer.js /installer.js
```
If all files are downloaded without issue, you'll be asked if you would like a quickstart guide. (Which will be a far less *pretty* version of next section of this README anyways :D )
</br>
</br>

I've set up a file with a handful of useful aliases you'll want to set up. Simply copy and paste the contents of the following into the terminal, and run it!
```
nano /tools/alias.txt
```
Now with that out of the way, let's get into basic commands!


1. To get started, you'll need to crack open, and infect a new target. if this is a fresh save, try this:
```
sire crack n00dles
```


2.  Now make n00dles attack it's self!
```
sire attack
```


3.  Don't forget to startup the listener! (TL;DR: Upgrade your in-game RAM ASAP! See below.)
```
list
```
<br>
<br>

**That section you said was TL, so you DR:**

When I built this botnet I wanted everything to function the way it currently does while keeping to the original 8Gb of starting RAM in-game. While I *was* able to do that, I eventually had to cave and say *"It works, with a caveat."* At the slimmest, the main script and listener *together* were exactly 8Gb, which still threw errors over RAM limitation. This meant I had to pull a few QoL things from the script that I wasn't happy about removing, so I replaced them, and we just deal with that caveat. ***If you are running on the game's starting 8GB of RAM, you will need to kill the listener, run what you want to on the main script, the start the listener back up once sire.js is finished running.*** Even with this annoyance, the botnet should *net* you enough scratch to upgrade fairly quickly, and RAM upgrades are persistent on resets anyways.

---

### Commands:

***Crack:***

```
sire crack [target]
```
This will run all necessary port cracking operations, infect the host with the SireNET attack files, and a few other things *for later.*

<br>

***Attack:***

```
sire attack [target]
```
Without the optional [target], this will cause all of your infected hosts to run the attack schema on themselves in an "autophagic attack." (noodles attacks n00dles, joesguns attack joesguns, etc. Your infected hosts name's are kept in /utils/guestBook.txt) Adding an optional [target] will cause all infected hosts to run the attack schema on [target] (including an autophagic attack on [target]).

<br>

***TBath:***

```
tbath

// OR

sire tbath
```
If run with Sire, kills all running processes on all infected hosts. Otherwise, kills all processes on self.

---

### Additional Commands:

***List:***

```
list
```
This will activate the listener. **Note:** If you are using the starting in-game RAM of 8GM, you will need to kill this process before each use of the main script, then start it back up afterwards, otherwise the attack schema will break. (Will eventually add a check for >8GB of RAM on home and autorun feature to main script.) 

---

### Flags:

Flags primarily adjust *who* is attacking a target. This gives you the ability to coordinate mass attacks on multiple targets. Currently you can only split up attacking groups by RAM size (8 or less, 16-32, and 64+), however I do plan on adding a new grouping selector that will make a balanced "squad" of various RAM size attackers.

***S/Small:***

```
sire attack [target] -s

// OR

sire attack [target] --small
```
Will make all infected hosts with **8GB RAM or less** attack [target]. If [target] is ommited, the same RAM size filtering applies to an autophagic attack.

<br>

***M/Medium:***

```
sire attack [target] -m

// OR

sire attack [target] --medium
```
Will make all infected hosts **between 16-32GB RAM** attack [target]. If [target] is ommited, the same RAM size filtering applies to an autophagic attack.

<br>

***L/Large:***

```
sire attack [target] -l

// OR

sire attack [target] --large
```
Will make all infected hosts with **64GB RAM or more** attack [target]. If [target] is ommited, the same RAM applies to an autophagic attack.

***Log:***

```
sire attack [target] --log
```
Creates a log dump to an easy to find text file (/logs/). Example log file name:
"ATTACK-n00dles-(2025-9-29_@9:37-PM)sireLog.txt"

---

### Comming soonTM:

These features have not been implemented yet, but are in the wings!

***Command: Feed***

```
sire feed [target]
```
Uses all available free RAM on home to run the attack schema on [target].
**Note:** *This will require at least one RAM upgrade on home in order to be useful in any way.

<br>

***Flag: Squad***

```
sire attack [target] --squad
```
Will create a group of attackers with a mix of RAM sizes to attack [target]. Would need an efficient way manage squads as well.

<br>

***Story elements:***
Somewhere, in a directory far, far away, I have some interesting creative works to add, and surprises and easter-eggs for the user to find along the way. This however, is going to require a bit of "backend" setup that I have been holding on the back-bitburner until ~~now~~ after the main *circus act* of scripts and text files was really working smoothly, and had all the error handling I wanted to pack in. I need to create a few binary "calculators," or maybe *"calendars"* is a better term. These may be concatonated in the future. Below is a list of those calculators:

    1. Auto-purchasing/building port crackers
    2. Introducing story elements
    3. Tracking:
        - Player Level
        - Total Resets
        - Story elements
        - crack exe's?
        - Current infected hosts
        - Total infections


**Other things that need to be done:**

    * Clean up excess comments throughout code.
    * Remove some redundant files.
    * Add grouping conditions to *tbath* command
    * Need to figure out something to do with no-cash servers, and something better for no-RAM servers.

---