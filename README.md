# A minimal LightDM WebKit2 theme
Simple theme for the LightDM display manager using lightdm-webkit2-greeter.
![Screen sample 1](https://github.com/allacee/lightdm-webkit2-theme-minimal/blob/master/assets/screenshots/screenshot-1.png)


## Installation 
1. Clone or download this repo
2. Copy the content of the repo to `/usr/share/lightdm-webkit/themes/minimal`
2. Install `lightdm` and `lightdm-webkit2-greeter`
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
6. Enjoy!
