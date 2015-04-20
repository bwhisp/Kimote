#Kimote [![Build Status](https://travis-ci.org/eftov/Kimote.svg?branch=master)](https://travis-ci.org/eftov/Kimote)

Kimote is a multi-platform remote application for [Kodi][], developed by 8 telecommunications students from ENSEIRB-MATMECA, a French Engineering School.

It is available for all platforms supported by the [Apache Cordova][] framework but actually only tested on iOS and Android.

On top of Cordova, it is built with [AngularJS][] and the [Ionic][] framework.

[![Kimote logo](https://github.com/eftov/Kimote/blob/master/resources/kimote_logo.png)](Kimote)

##Installation

First, you need to get Cordova and Ionic, with npm : `npm install -g cordova ionic` or download it from the website. 

Create a new project with :

	ionic start Kimote blank
	cd Kimote
	rm -r www

Get Kimote with `git clone https://github.com/eftov/Kimote.git` and move the www and resources folders to the app folder.

Add the platforms you need, for example iOS and Android :

	ionic platform add ios
	ionic platform add android
	
and other supported platforms if you want.

Build it with `ionic build` or just run it on your device  with `ionic run android` and/or `ionic run ios`.

##Get Kodi/OpenELEC

###Kodi

Kimote is only compatible with Kodi v15 and +. You can download nightly versions from here : <http://mirrors.kodi.tv/nightlies/>

###OpenELEC

If you want Kodi on your RaspberryPi, [OpenELEC][] is the way to go. Clone it from here : <https://github.com/OpenELEC/OpenELEC.tv/tree/openelec-next> and build it yourself.

Or you can just download our compiled version (11 April 2015) available here : https://www.dropbox.com/s/2n7k1jonscizfl6/OpenELEC-RPi.arm-devel-20150411091720-r20584-g254b69d.img?dl=0

##Contacts

###Supervisors

- Jean-Rémy Falleri - falleri@labri.fr
- Laurent Réveillère - reveillere@enseirb-matmeca.fr

###Students

- Philippe DIEP - Philippe.Diep@enseirb-matmeca.fr
- Moriba DOUMBIA - Moriba.Doumbia@enseirb-matmeca.fr
- Akram EL FADIL - Akram.El_Fadil@enseirb-matmeca.fr
- Benjamin FOVET - Benjamin.Fovet@enseirb-matmeca.fr
- Maxime GASQUE - Maxime.Gasque@enseirb-matmeca.fr
- Aude PLANCHAMP - Aude.Planchamp@enseirb-matmeca.fr
- Héloïse ROSTAN - Heloise.Rostan@enseirb-matmeca.fr
- Anass SEDDIKI - Anass.Seddiki@enseirb-matmeca.fr


[Kodi]: http://kodi.tv/
[Apache Cordova]: https://cordova.apache.org
[AngularJS]: https://angularjs.org/
[Ionic]: http://ionicframework.com/
[OpenELEC]: http://openelec.tv/
