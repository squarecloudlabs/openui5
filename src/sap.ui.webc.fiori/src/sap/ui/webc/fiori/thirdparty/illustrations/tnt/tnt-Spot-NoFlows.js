sap.ui.define(function () { 'use strict';

  var spotSvg = `<svg width="128" height="128" viewBox="0 0 128 128" id="tnt-Spot-NoFlows">
  <path fill="var(--sapIllus_ObjectFillColor)" d="M95.9991,100 L32.0001,100 C30.3431,100 29.0001,98.656 29.0001,96.999 L29.0001,33.001 C29.0001,31.344 30.3431,30 32.0001,30 L95.9991,30 C97.6561,30 99.0001,31.344 99.0001,33.001 L99.0001,96.999 C99.0001,98.656 97.6561,100 95.9991,100" class="sapIllus_ObjectFillColor"/>
  <path fill="var(--sapIllus_BrandColorSecondary)" d="M99,43 L29,43 L29,32.995 C29,31.341 30.341,30 31.995,30 L96.004,30 C97.659,30 99,31.341 99,32.995 L99,43 Z" class="sapIllus_BrandColorSecondary"/>
  <path fill="var(--sapIllus_StrokeDetailColor)" d="M96,99 L32,99 C30.895,99 30,98.104 30,97 L30,43 L31.821,43 L98,45.904 L98,97 C98,98.104 97.104,99 96,99 M98,33 L98,42 L30,42 L30,33 C30,31.896 30.895,31 32,31 L96,31 C97.104,31 98,31.896 98,33 M96,30 L95.526,30 L31.59,30 L31.544,30 C29.817,30 29,31.691 29,32.897 L29,43 L29,97 C29,98.657 30.343,100 32,100 L96,100 C97.657,100 99,98.657 99,97 L99,45.994 L99,42.95 L99,33 C99,31.343 97.657,30 96,30" class="sapIllus_StrokeDetailColor"/>
  <path fill="var(--sapIllus_PatternShadow)" d="M100,35 L99.956,35 L99,35 L99,42.95 L99,45.994 L99,97 C99,98.657 97.657,100 96,100 L33.044,100 L33.045,101.999 C33.045,103.656 34.388,105 36.044,105 L100,105 C101.657,105 103,103.657 103,102 L103,38 C103,36.343 101.657,35 100,35" class="sapIllus_PatternShadow"/>
  <path fill="var(--sapIllus_BackgroundColor)" d="M68.8926,61.961 L60.2176,61.961 L60.2176,57.411 C60.2176,56.887 59.7916,56.461 59.2676,56.461 L41.1676,56.461 C40.6426,56.461 40.2176,56.887 40.2176,57.411 L40.2176,67.511 C40.2176,68.036 40.6426,68.461 41.1676,68.461 L49.7176,68.461 L49.7176,75.923 L41.1676,75.923 C40.6426,75.923 40.2176,76.348 40.2176,76.872 L40.2176,86.973 C40.2176,87.497 40.6426,87.923 41.1676,87.923 L59.2676,87.923 C59.7916,87.923 60.2176,87.497 60.2176,86.973 L60.2176,76.872 C60.2176,76.348 59.7916,75.923 59.2676,75.923 L50.7176,75.923 L50.7176,68.461 L59.2676,68.461 C59.7916,68.461 60.2176,68.036 60.2176,67.511 L60.2176,62.961 L68.8926,62.961 L68.8926,61.961 Z" class="sapIllus_BackgroundColor"/>
  <path fill="var(--sapIllus_AccentColor)" d="M77.7349,54.1201 C77.1449,54.1201 76.5559,54.3451 76.1069,54.7931 L70.0669,60.8331 C69.6319,61.2671 69.3929,61.8471 69.3929,62.4611 C69.3929,63.0761 69.6319,63.6541 70.0669,64.0891 L76.1069,70.1291 C76.9769,70.9981 78.4929,70.9981 79.3629,70.1291 L85.4029,64.0891 C85.8379,63.6541 86.0769,63.0761 86.0769,62.4611 C86.0769,61.8471 85.8379,61.2671 85.4029,60.8331 L79.3629,54.7931 C78.9139,54.3451 78.3239,54.1201 77.7349,54.1201 M77.7349,71.8041 C76.8529,71.8041 76.0239,71.4601 75.3999,70.8361 L69.3599,64.7961 C68.7359,64.1731 68.3929,63.3441 68.3929,62.4611 C68.3929,61.5791 68.7359,60.7501 69.3599,60.1261 L75.3999,54.0861 C76.6869,52.7991 78.7829,52.7991 80.0699,54.0861 L86.1099,60.1261 C86.7339,60.7501 87.0769,61.5791 87.0769,62.4611 C87.0769,63.3441 86.7339,64.1731 86.1099,64.7961 L80.0699,70.8361 C79.4459,71.4601 78.6169,71.8041 77.7349,71.8041" class="sapIllus_AccentColor"/>
  <path fill="var(--sapIllus_Layering1)" d="M113.9495 28.256C113.9405 28.256 113.9315 28.256 113.9235 28.255L103.4295 27.986C103.0115 27.976 102.6445 27.706 102.5095 27.31 102.3735 26.914 102.4995 26.476 102.8245 26.211L111.6765 19 104.0005 19C103.4485 19 103.0005 18.552 103.0005 18 103.0005 17.447 103.4485 17 104.0005 17L114.4875 17C114.9095 17 115.2875 17.266 115.4295 17.665 115.5715 18.064 115.4465 18.508 115.1185 18.776L106.1805 26.056 113.9745 26.256C114.5265 26.271 114.9625 26.73 114.9485 27.281 114.9345 27.824 114.4905 28.256 113.9495 28.256M123.886 9.5079L123.86 9.5079 117.615 9.3479C117.197 9.3369 116.829 9.0679 116.694 8.6709 116.559 8.2759 116.684 7.8369 117.009 7.5719L121.395 3.9999 118 3.9999C117.448 3.9999 117 3.5519 117 2.9999 117 2.4469 117.448 1.9999 118 1.9999L124.206 1.9999C124.629 1.9999 125.006 2.2659 125.148 2.6649 125.29 3.0639 125.165 3.5079 124.837 3.7759L120.366 7.4169 123.911 7.5089C124.463 7.5229 124.899 7.9819 124.885 8.5339 124.871 9.0769 124.427 9.5079 123.886 9.5079" class="sapIllus_Layering1"/>
</svg>`;

  return spotSvg;

});
