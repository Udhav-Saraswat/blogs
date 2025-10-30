# ==========================
# IMPORTS
# ==========================
import io, json
from reportlab.lib.pagesizes import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.pdfbase import pdfmetrics


# ==========================
# SETUP AND PAGE SETTINGS
# ==========================
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiMin-W3"))

PAGE_WIDTH = 6 * inch
PAGE_HEIGHT = 9 * inch
OFF_WHITE = colors.HexColor("#FAF7F0")

chapter_starts = {}


# ==========================
# HEADER / FOOTER / BACKGROUND
# ==========================
def draw_background_and_header(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(OFF_WHITE)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)

    if doc.page <= 3:
        canvas.restoreState()
        return

    current_title = None
    for title, start_page in sorted(chapter_starts.items(), key=lambda x: x[1]):
        if doc.page >= start_page:
            current_title = title
        else:
            break

    if doc.page in chapter_starts.values():
        current_title = None

    if current_title:
        canvas.setFont("HeiseiMin-W3", 11)
        canvas.setFillColor(colors.HexColor("#444444"))
        canvas.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 0.5 * inch, current_title)

    canvas.setFont("HeiseiMin-W3", 10)
    canvas.setFillColor(colors.HexColor("#333333"))
    canvas.drawCentredString(PAGE_WIDTH / 2, 0.5 * inch, str(doc.page - 3))
    canvas.restoreState()


# ==========================
# CUSTOM FLOWABLE: CHAPTER HEADING
# ==========================
class ChapterHeading(Paragraph):
    def drawOn(self, canvas, x, y, _sW=0):
        page_num = canvas.getPageNumber()
        if self.text not in chapter_starts:
            chapter_starts[self.text] = page_num
        super().drawOn(canvas, x, y, _sW)


# ==========================
# TEXT STYLES
# ==========================
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="BigTitle", fontName="HeiseiMin-W3",
                          fontSize=50, leading=60, alignment=TA_CENTER, spaceAfter=20))
styles.add(ParagraphStyle(name="AuthorBottom", fontName="HeiseiMin-W3",
                          fontSize=18, leading=24, alignment=TA_CENTER, spaceBefore=40))
styles.add(ParagraphStyle(name="QuoteStyle", fontName="Times-BoldItalic",
                          fontSize=20, leading=28, alignment=TA_CENTER, spaceBefore=250, spaceAfter=10))
styles.add(ParagraphStyle(name="QuoteAttribution", fontName="Times-Italic",
                          fontSize=13, leading=18, alignment=TA_CENTER, spaceAfter=40))
styles.add(ParagraphStyle(name="TOCHeading", fontName="HeiseiMin-W3",
                          fontSize=22, leading=30, alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name="TOCEntry", fontName="HeiseiMin-W3",
                          fontSize=14, leading=22, alignment=TA_LEFT, leftIndent=0.4 * inch, spaceAfter=10))
styles.add(ParagraphStyle(name="ChapterHeading", fontName="Times-BoldItalic",
                          fontSize=42, leading=50, alignment=TA_LEFT, spaceAfter=30, spaceBefore=100))
styles.add(ParagraphStyle(name="Body", fontName="HeiseiMin-W3",
                          fontSize=11, leading=17, alignment=TA_LEFT, spaceAfter=10))


# ==========================
# LOAD CHAPTERS FROM JSON
# ==========================
with open("chapters.json", "r", encoding="utf-8") as f:
    chapters_data = json.load(f)


# ==========================
# BUILD FLOWABLES
# ==========================
def make_flow():
    flow = []

    # Title Page
    flow += [
        Spacer(1, 1.2 * inch),
        Paragraph("In the<br/>Street of<br/>Dreams", styles["BigTitle"]),
        Spacer(1, 2 * inch),
        Paragraph("Udhav Saraswat", styles["AuthorBottom"]),
        PageBreak(),
    ]

    # Quote Page
    flow += [
        Paragraph("“Nothing makes sense — until one day, everything does, for better or worse.”", styles["QuoteStyle"]),
        Paragraph("— Udhav", styles["QuoteAttribution"]),
        PageBreak(),
    ]

    # Table of Contents
    flow += [
        Spacer(1, 2.5 * inch),
        Paragraph("Contents", styles["TOCHeading"]),
        HRFlowable(width="60%", thickness=2.5, lineCap="round",
                   color=colors.HexColor("#333333"), spaceBefore=8, spaceAfter=25),
    ]

    for title in chapters_data.keys():
        flow.append(Paragraph(title, styles["TOCEntry"]))
    flow.append(PageBreak())

    # Chapters (from JSON)
    for title, body in chapters_data.items():
        flow.append(ChapterHeading(title, styles["ChapterHeading"]))
        flow.append(Spacer(1, 0.3 * inch))
        for para in body.strip().split("\n\n"):
            flow.append(Paragraph(para.strip(), styles["Body"]))
        flow.append(PageBreak())

    return flow


# ==========================
# PASS 1: Populate chapter_starts
# ==========================
temp_buffer = io.BytesIO()
temp_doc = SimpleDocTemplate(
    temp_buffer,
    pagesize=(PAGE_WIDTH, PAGE_HEIGHT),
    rightMargin=0.75 * inch,
    leftMargin=0.65 * inch,
    topMargin=0.75 * inch,
    bottomMargin=0.75 * inch,
)

flow = make_flow()
temp_doc.build(flow, onFirstPage=lambda c, d: None, onLaterPages=lambda c, d: None)
temp_buffer.close()


# ==========================
# PASS 2: Final PDF build
# ==========================
final_doc = SimpleDocTemplate(
    "In_the_Street_of_Dreams.pdf",
    pagesize=(PAGE_WIDTH, PAGE_HEIGHT),
    rightMargin=0.75 * inch,
    leftMargin=0.65 * inch,
    topMargin=0.75 * inch,
    bottomMargin=0.75 * inch,
)

flow = make_flow()
final_doc.build(flow, onFirstPage=draw_background_and_header, onLaterPages=draw_background_and_header)

print("✅ PDF generated successfully — headers now reliably skipped on every chapter's first page.")
