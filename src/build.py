#!/usr/bin/env python3
"""Bangun index.html dari src/index.tpl.html: sisipkan ikon Tabler (SVG inline) dan field IDDS."""
import re, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
ICON = R / "idds/icons"

def svg(name, size=20, sw="1.5"):
    s = (ICON / f"{name}.svg").read_text()
    inner = re.search(r">\s*(.*)\s*</svg>", s, re.S).group(1)
    inner = re.sub(r'<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*/>', "", inner)
    inner = re.sub(r"\s+", " ", inner).strip()
    return (f'<svg class="ic" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{inner}</svg>')

CHEV = '<svg class="ina-accordion__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CHEVR = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def field(m):
    p = m.group(1).split("|")
    fid, label, typ, ph, ac = p[:5]
    req = "required" in p
    mode = "numeric" if "numeric" in p else ("tel" if "tel" in p[5:] else "")
    maxlen = next((x for x in p[5:] if x.isdigit()), "")
    attrs = f'type="{typ}" id="{fid}" name="{fid}" class="ina-text-field__input" placeholder="{ph}" autocomplete="{ac}" aria-describedby="{fid}-msg"'
    if req: attrs += ' required aria-required="true"'
    if mode: attrs += f' inputmode="{mode}"'
    if maxlen: attrs += f' maxlength="{maxlen}"'
    star = '<span aria-hidden="true"> *</span>' if req else ""
    return (f'<div class="ina-text-field" data-f="{fid}"><label class="ina-text-field__label" for="{fid}">{label}{star}</label>'
            f'<div class="ina-text-field__wrapper ina-text-field__wrapper--size-md"><input {attrs}></div>'
            f'<div class="ina-text-field__bottom-area"><div id="{fid}-msg" class="ina-text-field__helper-text" hidden></div></div></div>')

def radio(m):
    v, label = m.group(1).split("|")
    return (f'<div class="ina-radio-input__option"><input type="radio" id="kat-{v}" name="kategori" value="{label}" class="ina-radio-input__field">'
            f'<label for="kat-{v}" class="ina-radio-input__option-label">{label}</label></div>')

t = (R / "src/index.tpl.html").read_text()
t = re.sub(r"\{\{icon16:([a-z0-9-]+)\}\}", lambda m: svg(m.group(1), 16, "1.25"), t)
t = re.sub(r"\{\{icon:([a-z0-9-]+)\}\}", lambda m: svg(m.group(1)), t)
t = t.replace("{{chev}}", CHEV).replace("{{chevr}}", CHEVR)
t = re.sub(r"\{\{field:([^}]+)\}\}", field, t)
t = re.sub(r"\{\{radio:([^}]+)\}\}", radio, t)
assert "{{" not in t, re.findall(r"\{\{[^}]*\}\}", t)
(R / "index.html").write_text(t)
print("index.html", len(t))
