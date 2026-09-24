"""Trim the self-hosted fonts to what the site uses: same look, about half the bytes.

The sources are the @fontsource latin files in node_modules. Needs `pip install fonttools brotli`.
Run from the repo root: python3 scripts/trim-fonts.py [output names...]  (no names: all three)
"""

import sys

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONTS = {
    # Body text 400-600, the eye chart at 800 and 118% wide.
    "archivo.woff2": ("@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2", {"wdth": (100, 118), "wght": (400, 800)}),
    # Headlines 500, everything else 400. Optical size kept: it's what makes the big headlines fine.
    "fraunces.woff2": ("@fontsource-variable/fraunces/files/fraunces-latin-standard-normal.woff2", {"wght": (400, 500)}),
    # The italic word: soft and wonky, baked in.
    "fraunces-italic.woff2": ("@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2", {"SOFT": 80, "WONK": 1, "wght": (400, 500)}),
}

for name in sys.argv[1:] or FONTS:
    source, limits = FONTS[name]
    font = instantiateVariableFont(TTFont(f"node_modules/{source}"), limits)
    font.flavor = "woff2"
    font.save(f"src/assets/fonts/{name}")
    print(name, limits)
