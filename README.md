# A minimal LightDM WebKit2 theme
Simple theme for the LightDM display manager using lightdm-webkit2-greeter. Intended mostly for single-user systems.
![Screen sample 1](https://github.com/TheTerrior/lightdm-minimal/blob/master/assets/screenshots/screenshot-1.png)


## Installation 
1. Clone or download this repo
2. Copy the content of the repo to `/usr/share/lightdm-webkit/themes/minimal`
3. Install `lightdm` and `lightdm-webkit2-greeter`
4. Set webkit2 greeter as a greeter. Edit file `/etc/lightdm/lightdm.conf`: 
```
[Seat:*]
...
greeter-session=lightdm-webkit2-greeter
```

5. Set this theme as greeter theme. Edit file `/etc/lightdm/lightdm-webkit2-greeter.conf`: 
```
webkit_theme = minimal
```
### Alternatively...
Run the risky installer with root permissions instead of step 2 above:
```
sudo ./risky_installer.sh
```
This will replace any pre-existing theme on your system called 'minimal'. Mostly intended for development purposes to quickly reload the new theme.
