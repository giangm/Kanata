import subprocess
import sys

setup = {
    "Installing prerequisites": "sudo apt install -y software-properties-common apt-transport-https wget curl",
    "Adding software repository source": "echo 'deb http://http.kali.org/kali kali-rolling \
        main contrib non-free non-free-firmware' | sudo tee -a /etc/apt/sources.list",
    "Downloading trusted GPG key": "curl -sSL https://archive.kali.org/archive-key.asc | \
        sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/kali-archive-keyring.gpg",
    "Updating system": "sudo apt -y update",
    "Downloading Microsoft GPG key": "wget https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -",
    "Adding Microsoft Visual Studio Code repository": "sudo add-apt-repository -y 'deb [arch=amd64] \
        https://packages.microsoft.com/repos/vscode stable main'"
}

tools = {
    "Java": "sudo apt install -y default-jre",
    "Visual Studio Code": "sudo apt install -y code-oss",
    "NPM": "sudo apt install npm",
    "Burp Suite Community": "sudo apt install -y burpsuite",
    "JD-GUI": "wget -O /tmp/jd-gui-1.6.6.deb 'https://github.com/java-decompiler/jd-gui/releases/download/v1.6.6/jd-gui-1.6.6.deb' \
        && sudo dpkg -i /tmp/jd-gui-1.6.6.deb",
    "ILSpy": "wget -O /tmp/Linux.x64.Release.zip 'https://github.com/icsharpcode/AvaloniaILSpy/releases/download/v7.2-rc/Linux.x64.Release.zip' \
        && unzip /tmp/Linux.x64.Release.zip -d /tmp/ && sudo mkdir -p /opt/ILSpy && sudo unzip /tmp/ILSpy-linux-x64-Release.zip -d /opt/ILSpy",
    "Docker": "sudo apt install -y docker.io && sudo groupadd -f docker && sudo usermod -aG docker $USER"
}

cleanup = {
    "Adding ILSpy to PATH": "echo 'export PATH=$PATH:/opt/ILSpy/artifacts/linux-x64/' >> ~/.bashrc",
    "Removing temporary files": "rm -f /tmp/jd-gui-1.6.6.deb /tmp/Linux.x64.Release.zip /tmp/ILSpy-linux-x64-Release.zip",
    "Creating alias for JD-GUI": "echo \"alias jd-gui='java -jar /opt/jd-gui/jd-gui.jar'\" >> ~/.bashrc && bash -c 'source ~/.bashrc'"
}

def run_cmd(step, command):
    print(f"\033[4m{step}\033[0m")
    result = subprocess.run(command, shell=True)
    if result.returncode == 0:
        print("\033[92m✓ Completed\033[0m", end="\n\n")
    else:
        print("\033[91m✗ Failed\033[0m")
        sys.exit(1)
        
def main():    
    for step, command in setup.items():
        run_cmd(step, command)
        
    for tool, command in tools.items():
        run_cmd(f"Installing {tool}", command)
        
    for step, command in cleanup.items():
        run_cmd(step, command)

    print("\033[92m✓ Tools installation completed!\033[0m")
    
    
if __name__ == "__main__":
    main()
