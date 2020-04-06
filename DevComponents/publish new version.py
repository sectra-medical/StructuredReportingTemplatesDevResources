import subprocess
import os
import json


def pause():
	print("Press enter to close.")
	input()

def are_numbers(list):
	try:
		for x in list:
			float(x)
		return True
	except ValueError:
		return False

def validate_version(newVersion):
	versions = newVersion.split(".")
	
	if len(versions) != 3 and not are_numbers(versions):
		print("Unvalid version string. Must be on format MAJOR.MINOR.PATCH")
		return False
	return True

def publish():
	print("Type new version string. Leave empty to just increment minor version by one.")
	print("New version: ")
	newVersion = input()
	statusOutput = subprocess.run(["git", "status"], stdout=subprocess.PIPE, shell=True).stdout.decode("utf-8")
	if statusOutput.find("nothing to commit, working tree clean") == -1:
		print("Not clean working tree, push all changes before running this.")
		pause()
		return
	if newVersion != "":
		if not validate_version(newVersion):
			pause()
			return
		versionStr = newVersion
	else:
		versionOutput = subprocess.run(["npm", "version"], stdout=subprocess.PIPE, shell=True).stdout.decode("utf-8")
		version = versionOutput[24:versionOutput.find(",")-1].split(".")
		newMinorVersion = str(int(version[1])+1)
		version[1] = newMinorVersion
		versionStr = version[0] + "." + version[1] + "." + version[2]

	os.system("npm run build")
	os.system("npm version " + versionStr + " -m\"Increment npm version to %s\"")
	os.system("git push && git push --tags")
	os.system("npm publish")
	pause()

publish()
