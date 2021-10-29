sap.ui.define(function () { 'use strict';

  var dialogSvg = `<svg width="160" height="160" viewBox="0 0 160 160" id="tnt-Dialog-NoFlows">
  <path fill="var(--sapIllus_ObjectFillColor)" d="M122.7803,125.5 L38.2193,125.5 C36.7173,125.5 35.5003,124.282 35.5003,122.78 L35.5003,38.22 C35.5003,36.718 36.7173,35.5 38.2193,35.5 L122.7803,35.5 C124.2823,35.5 125.5003,36.718 125.5003,38.22 L125.5003,122.78 C125.5003,124.282 124.2823,125.5 122.7803,125.5" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_BrandColorSecondary)" d="M126,52 L36,52 L36,38.884 C36,36.738 37.739,35 39.884,35 L122.116,35 C124.261,35 126,36.738 126,38.884 L126,52 Z" class="sapIllus_BrandColorSecondary"/>
  <path fill="var(--sapIllus_BrandColorSecondary)" d="M125,52 L35,52 L35,38.997 C35,36.789 36.79,35 38.997,35 L121.981,35 C123.648,35 125,36.352 125,38.019 L125,52 Z" class="sapIllus_BrandColorSecondary"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M38.5,36 C37.122,36 36,37.121 36,38.5 L36,122.5 C36,123.878 37.122,125 38.5,125 L122.5,125 C123.878,125 125,123.878 125,122.5 L125,38.5 C125,37.121 123.878,36 122.5,36 L38.5,36 Z M122.5,126 L38.5,126 C36.57,126 35,124.43 35,122.5 L35,38.5 C35,36.57 36.57,35 38.5,35 L122.5,35 C124.43,35 126,36.57 126,38.5 L126,122.5 C126,124.43 124.43,126 122.5,126 L122.5,126 Z" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M36,52 L36,38.5 C36,37.121 37.122,36 38.5,36 L122.5,36 C123.878,36 125,37.121 125,38.5 L125,52 L36,52 Z M122.5,125 L38.5,125 C37.122,125 36,123.878 36,122.5 L36,52.002 L125,55.603 L125,122.5 C125,123.878 123.878,125 122.5,125 L122.5,125 Z M122.5,35 L38.5,35 C36.57,35 35,36.57 35,38.5 L35,122.5 C35,124.43 36.57,126 38.5,126 L122.5,126 C124.43,126 126,124.43 126,122.5 L126,38.5 C126,36.57 124.43,35 122.5,35 L122.5,35 Z" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_BackgroundColor)" d="M88.4444,77.9092 L77.1224,77.9092 L77.1224,71.5282 C77.1224,71.0042 76.6964,70.5792 76.1724,70.5792 L51.9694,70.5792 C51.4444,70.5792 51.0194,71.0042 51.0194,71.5282 L51.0194,85.2902 C51.0194,85.8142 51.4444,86.2402 51.9694,86.2402 L63.5704,86.2402 L63.5704,95.9772 L51.9694,95.9772 C51.4444,95.9772 51.0194,96.4032 51.0194,96.9282 L51.0194,110.6892 C51.0194,111.2142 51.4444,111.6392 51.9694,111.6392 L76.1724,111.6392 C76.6964,111.6392 77.1224,111.2142 77.1224,110.6892 L77.1224,96.9282 C77.1224,96.4032 76.6964,95.9772 76.1724,95.9772 L64.5704,95.9772 L64.5704,86.2402 L76.1724,86.2402 C76.6964,86.2402 77.1224,85.8142 77.1224,85.2902 L77.1224,78.9092 L88.4444,78.9092 L88.4444,77.9092 Z" class="sapIllus_BackgroundColor"/>
  <path fill="var(--sapIllus_AccentColor)" d="M100.3389,67.0166 C99.7489,67.0166 99.1589,67.2416 98.7109,67.6896 L89.6179,76.7826 C89.1839,77.2166 88.9439,77.7946 88.9439,78.4106 C88.9439,79.0246 89.1839,79.6026 89.6179,80.0376 L98.7109,89.1296 C99.6069,90.0256 101.0679,90.0276 101.9659,89.1296 L111.0589,80.0376 C111.9559,79.1396 111.9559,77.6796 111.0589,76.7826 L101.9659,67.6896 C101.5179,67.2416 100.9279,67.0166 100.3389,67.0166 M100.3389,90.8036 C99.4559,90.8036 98.6269,90.4596 98.0039,89.8366 L88.9109,80.7446 C88.2879,80.1206 87.9439,79.2916 87.9439,78.4106 C87.9439,77.5276 88.2879,76.6986 88.9109,76.0756 L98.0039,66.9826 C99.2499,65.7376 101.4259,65.7356 102.6729,66.9826 L111.7659,76.0756 C112.3889,76.6986 112.7329,77.5276 112.7329,78.4106 C112.7329,79.2916 112.3889,80.1206 111.7659,80.7446 L102.6729,89.8366 C102.0499,90.4596 101.2209,90.8036 100.3389,90.8036" class="sapIllus_AccentColor"/>
  <path fill="var(--sapIllus_PatternShadow)" d="M127.1388,42.0002 L127.0858,42.0002 L125.9998,42.0002 L125.9998,122.5002 C125.9998,124.4302 124.4298,126.0002 122.4998,126.0002 L41.0568,126.0002 L41.0578,128.1422 C41.0578,130.2722 42.7848,132.0002 44.9138,132.0002 L127.1388,132.0002 C129.2718,132.0002 130.9998,130.2712 130.9998,128.1392 L130.9998,45.8602 C130.9998,43.7292 129.2718,42.0002 127.1388,42.0002" class="sapIllus_PatternShadow"/>
  <path fill="var(--sapIllus_BackgroundColor)" d="M131,146.5 C131,148.985 108.391,151 80.5,151 C52.609,151 30,148.985 30,146.5 C30,144.015 52.609,142 80.5,142 C108.391,142 131,144.015 131,146.5" class="sapIllus_BackgroundColor"/>
  <path fill="var(--sapIllus_Layering1)" d="M143.3732 34.256C143.3642 34.256 143.3552 34.256 143.3472 34.255L132.8522 33.986C132.4352 33.976 132.0672 33.706 131.9332 33.31 131.7972 32.914 131.9232 32.476 132.2472 32.211L141.1002 25 133.0002 25C132.4472 25 132.0002 24.552 132.0002 24 132.0002 23.447 132.4472 23 133.0002 23L143.9102 23C144.3332 23 144.7112 23.266 144.8522 23.665 144.9942 24.064 144.8702 24.508 144.5422 24.776L135.6042 32.056 143.3972 32.256C143.9502 32.271 144.3862 32.73 144.3722 33.281 144.3582 33.824 143.9132 34.256 143.3732 34.256M151.3917 15.508L151.3667 15.508 145.1207 15.348C144.7027 15.337 144.3347 15.068 144.2007 14.671 144.0647 14.276 144.1907 13.837 144.5147 13.572L148.9007 10 144.9997 10C144.4477 10 143.9997 9.552 143.9997 9 143.9997 8.447 144.4477 8 144.9997 8L151.7117 8C152.1347 8 152.5117 8.266 152.6547 8.665 152.7957 9.064 152.6707 9.508 152.3427 9.776L147.8717 13.417 151.4167 13.509C151.9687 13.523 152.4057 13.982 152.3907 14.534 152.3767 15.077 151.9327 15.508 151.3917 15.508" class="sapIllus_Layering1"/>
</svg>`;

  return dialogSvg;

});
