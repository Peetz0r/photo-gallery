function clickLink(className) {
  const elem = document.getElementsByClassName(className)
  if (elem.length !== 0) {
    elem[0].click();
  }
}

document.onkeydown = function(e) {
  switch(e.keyCode) {
    case 37:
      clickLink('previous');
      break;
    case 39:
      clickLink('next');
      break;
  }
}

window.addEventListener('load', function() {
  const im = document.querySelector('img.large')
  const dl = document.querySelector('dl');
  if (im) {
    EXIF.getData(im, function() {
      const exif = EXIF.getAllTags(this);
      console.log(exif);
      if (Object.keys(exif).length < 1) {
        dl.remove();
        return;
      }

      let d = {};
      if(exif.Model) d[exif.Make] = exif.Model;
      if(exif.FocalLength) d['Focal Length'] = exif.FocalLength+' mm';
      if(exif.FocalLengthIn35mmFilm) d['35mm equivalent'] = exif.FocalLengthIn35mmFilm+' mm';
      if(exif.FNumber) d['Aperture'] ='f/'+exif.FNumber;
      if(exif.ExposureTime) d['Exposure time'] = (exif.ExposureTime <1 ? ('1/' + 1/exif.ExposureTime) : exif.ExposureTime) + ' s';
      if(exif.DateTime) d['Date/Time'] = exif.DateTime;
      if(exif.ISOSpeedRatings) d['ISO'] = exif.ISOSpeedRatings;
      if(exif.ExposureBias != undefined) d['EV'] = (exif.ExposureBias>0?'+':'') + exif.ExposureBias;
      if(exif.MeteringMode) d['Metering Mode'] = exif.MeteringMode;
      if(exif.ExposureProgram) d['Exposure Program'] = exif.ExposureProgram;
      if(exif.WhiteBalance) d['White Balance'] = exif.WhiteBalance;
      if(exif.Software) d['Software'] = exif.Software;

      for (const i in d) {
        let dt = document.createElement('dt');
        let dd = document.createElement('dd');
        dt.innerText = i;
        dd.innerText = d[i];
        dl.appendChild(dt);
        dl.appendChild(dd);
      }

      dl.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) dl.scrollLeft += 50;
        else dl.scrollLeft -= 50;
      });
    });
  }
});
