# Behringer UV1 Audio Stuttering

*I use arch btw* -- we know the meme... but it's a nice distro in my opinion to get a bit more linux hands-on without being as advanced as Gentoo.

Digressing, as of the date of this post it seems the Behringer UV1 audio interface is not incorporated into the ~5.19.8-arch1-1~ kernel and results in de-syncs and stuttering every second or so, with the following reported in ~dmesg~.

``` sh
sudo dmesg -T | grep -i usb
```

``` sh
[14749.453470] usb 5-2: New USB device found, idVendor=1397, idProduct=0510, bcdDevice= 1.00
[14749.453472] usb 5-2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[14749.453473] usb 5-2: Product: UV1
[14749.453474] usb 5-2: Manufacturer: Behringer
[14749.534720] usb 5-2: clock source 41 is not valid, cannot use
[14749.597974] usb 5-2: clock source 41 is not valid, cannot use
[14749.601222] usb 5-2: clock source 41 is not valid, cannot use
[14749.604472] usb 5-2: clock source 41 is not valid, cannot use
[14749.607723] usb 5-2: clock source 41 is not valid, cannot use
[14749.610972] usb 5-2: clock source 41 is not valid, cannot use
[14749.614475] usb 5-2: clock source 41 is not valid, cannot use
[14749.617723] usb 5-2: clock source 41 is not valid, cannot use
[14749.620973] usb 5-2: clock source 41 is not valid, cannot use
[15258.125221] usb 1-5: reset full-speed USB device number 2 using xhci_hcd
[16477.408189] usb 1-5: reset full-speed USB device number 2 using xhci_hcd
```

Went hard into Googling to see if anyone had this issue and a solution... and I was finding nothing of value (╯°□°)╯︵ ┻━┻. It wasn't until I ran into this [comment on Reddit](https://www.reddit.com/r/linuxaudio/comments/sim11g/comment/hv9qhqx/?utm_source=share&utm_medium=web2x&context=3), specifying a different model than the one I am using but the same make and reported symptoms. Fired up ~kitty~ and created the required conf file for modprobe to load.

``` sh
sudo vim /etc/modprobe.d/uv1.conf
```

``` sh
# uv1.conf
options snd_usb_audio implicit_fb=1
```

Restarted my system, hoped for the best, and problems gone!
