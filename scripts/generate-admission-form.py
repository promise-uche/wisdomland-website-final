"""
Regenerates public/admission-form.pdf (the printable admission form).
Run:  python3 scripts/generate-admission-form.py
Needs: pip install reportlab
Edit the CONTACT block below if the school's phone numbers, address or email change.
"""
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.colors import HexColor, white, black
import os

# ---- CONTACT DETAILS (shown in the form header) ----
SCHOOL = "WISDOM LAND MODEL SCHOOLS"
ADDRESS = "Lola Engineering Bus Stop, Bells University Junction, Ota, Ogun State"
PHONES = "+234 806 364 3013, +234 903 647 7475"
EMAIL = "wisdomlandschools@gmail.com"
# -----------------------------------------------------

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'admission-form.pdf')
W, H = A4
GREEN = HexColor('#0B3D2E')
L, R = 40, W - 40          # left / right margins
SH = 10                    # downward shift of the body to make room for the 2-line header
c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle('Wisdom Land Model Schools - Admission Application Form')
c.setAuthor('Wisdom Land Model Schools')

def y(top):  # convert "distance from top of page" to PDF coordinates
    return H - top

def size_for(text, font, target_width):
    return target_width / stringWidth(text, font, 1)

S_TITLE = size_for(SCHOOL, 'Helvetica-Bold', 278.6)
S_FORM = size_for('ADMISSION APPLICATION FORM', 'Helvetica-Bold', 207.3)
S_HEAD = size_for("PUPIL'S DETAILS", 'Helvetica-Bold', 84.0)
S_LABEL = size_for('Full Name:', 'Helvetica', 45.9)

# --- Header ---
c.setFillColor(GREEN); c.setFont('Helvetica-Bold', S_TITLE)
c.drawCentredString(W / 2, y(51), SCHOOL)
c.setFillColor(black); c.setFont('Helvetica', 7.6)
c.drawCentredString(W / 2, y(63), ADDRESS)
c.drawCentredString(W / 2, y(73), f"Tel: {PHONES}   |   {EMAIL}")
c.setFont('Helvetica-Bold', S_FORM)
c.drawCentredString(W / 2, y(90 + SH), 'ADMISSION APPLICATION FORM')

def bar(text, text_top, right=R):
    c.setFillColor(GREEN)
    c.rect(L, y(text_top + SH + 12), right - L, 16, stroke=0, fill=1)
    c.setFillColor(white); c.setFont('Helvetica-Bold', S_HEAD)
    c.drawString(46, y(text_top + SH + 7.5), text)

def field(label, top, x=L, line_to=R, line_from=None):
    base = y(top + SH + 7)
    c.setFillColor(black); c.setFont('Helvetica', S_LABEL)
    c.drawString(x, base, label)
    start = line_from if line_from else x + stringWidth(label, 'Helvetica', S_LABEL) + 4
    c.setStrokeColor(HexColor('#333333')); c.setLineWidth(0.5)
    c.line(start, base - 2, line_to, base - 2)

# --- Pupil's details (bar stops short of the passport box) ---
bar("PUPIL'S DETAILS", 107.8, right=462)
c.setStrokeColor(black); c.setLineWidth(0.7)
c.rect(470, y(84 + 96), R - 470, 96)
c.setFillColor(HexColor('#666666')); c.setFont('Helvetica', 7.4)
c.drawCentredString((470 + R) / 2, y(84 + 50), 'Passport')
c.drawCentredString((470 + R) / 2, y(84 + 61), 'photograph')

field('Full Name:', 134.2, line_to=435)
field('Sex:', 158.2, line_from=64, line_to=118)
field('Date of Birth:', 158.2, x=127.7, line_to=435)
field('State of Origin:', 182.2, line_to=200)
field('Nationality:', 182.2, x=206.4)
field('Class Applying For:', 206.2)

bar('PARENT / GUARDIAN DETAILS', 233.8)
for i, lab in enumerate(["Father's Full Name:", "Father's Address and Phone Number:", 'Occupation of Father:',
                         "Mother's Full Name:", 'Occupation of Mother:', 'Parent/Guardian Residential Address:',
                         'In Case of Emergency, Who to Contact (with Phone Number):']):
    field(lab, 260.2 + 24 * i)

bar('GUARANTOR (A RESPONSIBLE MAN OR WOMAN)', 431.8)
for i, lab in enumerate(['Name:', 'Address and Phone Number:', 'Signature:']):
    field(lab, 458.2 + 24 * i)

bar('PREVIOUS SCHOOL', 533.8)
field('Former School:', 560.2)
field('Class Last Read (attach result):', 584.2)

bar('DOCUMENTS TO SUBMIT WITHIN ONE WEEK', 611.8)
c.setFillColor(black); c.setFont('Helvetica', S_LABEL)
for txt, x, top in [('[ ] Photocopies of last term result', 46, 632.2), ('[ ] Birth certificate', 202.8, 632.2),
                    ('[ ] Reference letter', 294.7, 632.2), ('[ ] Two passport photographs', 46, 648.2),
                    ('[ ] National Identification Number (NIN)', 187.5, 648.2),
                    ('[ ] School Identification Number (SIN)', 369.1, 648.2)]:
    c.drawString(x, y(top + SH + 7), txt)

bar('OATH', 671.8)
c.setFillColor(black); c.setFont('Helvetica', S_LABEL)
c.drawString(46, y(692.2 + SH + 7),
             'I declare that the information supplied above is true and I agree to abide by the rules and regulations of the school.')
field('Parent/Guardian Name:', 720.2, line_to=360)
field('Date:', 720.2, x=390, line_to=R)
field('Parent/Guardian Signature:', 748.2, line_to=360)

c.setFillColor(HexColor('#444444')); c.setFont('Helvetica-Oblique', 6.6)
c.drawCentredString(W / 2, y(802), 'For office use: Reference No. ____________   Received by ____________   Date ____________')
c.showPage(); c.save()
print('Wrote', os.path.abspath(OUT))
