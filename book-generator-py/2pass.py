# ==========================
# IMPORTS
# ==========================
# ReportLab components for creating styled PDF documents
import io
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
# Register a Japanese font (HeiseiMin-W3) that supports Unicode characters.
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiMin-W3"))

# Define page size constants (6x9 inch book layout)
PAGE_WIDTH = 6 * inch
PAGE_HEIGHT = 9 * inch

# Define a soft off-white background color for pages
OFF_WHITE = colors.HexColor("#FAF7F0")

# Dictionary to keep track of chapters and the page number where each starts
# Example: { "Chapter 1: The Train": 4, "Chapter 2: The City of Mist": 12 }
chapter_starts = {}


# ==========================
# HEADER / FOOTER / BACKGROUND DRAW FUNCTION
# ==========================
def draw_background_and_header(canvas, doc):
    """
    This function runs on every page during final render.
    It:
      - Draws the background color.
      - Adds the current chapter title at the top (except first page of each chapter).
      - Adds the page number at the bottom.
    """

    canvas.saveState()  # Save the current graphics state (good practice)

    # ---- Draw full-page background ----
    canvas.setFillColor(OFF_WHITE)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)

    # ---- Skip background header for the first 3 pages ----
    # (title page, quote page, table of contents)
    if doc.page <= 3:
        canvas.restoreState()
        return

    # ---- Determine current chapter based on page number ----
    current_title = None
    last_start_page = None
    for title, start_page in sorted(chapter_starts.items(), key=lambda x: x[1]):
        # If the current page number >= a chapter’s start page → that’s the current chapter
        if doc.page >= start_page:
            current_title = title
            last_start_page = start_page
        else:
            break

    # ---- Skip header if this page is a chapter’s start page ----
    # Use values() lookup — this reliably prevents header on chapter-first pages.
    if doc.page in chapter_starts.values():
        current_title = None  # Disable header for this page only

    # ---- Draw chapter title header ----
    if current_title:
        canvas.setFont("HeiseiMin-W3", 11)
        canvas.setFillColor(colors.HexColor("#444444"))
        # Center the title at top of page
        canvas.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 0.5 * inch, current_title)

    # ---- Draw page number (bottom center) ----
    canvas.setFont("HeiseiMin-W3", 10)
    canvas.setFillColor(colors.HexColor("#333333"))
    # Subtract 3 so numbering starts from the first chapter (page 1)
    canvas.drawCentredString(PAGE_WIDTH / 2, 0.5 * inch, str(doc.page - 3))

    # ---- Restore graphics state ----
    canvas.restoreState()


# ==========================
# CUSTOM FLOWABLE: CHAPTER HEADING
# ==========================
class ChapterHeading(Paragraph):
    """
    Subclass of Paragraph that records the page number where it is drawn.
    This registration happens when the paragraph is drawn (or drawOn is called).
    """
    def drawOn(self, canvas, x, y, _sW=0):
        # Record the page number when we start drawing the heading.
        # In first (in-memory) pass this populates chapter_starts.
        page_num = canvas.getPageNumber()
        if self.text not in chapter_starts:
            chapter_starts[self.text] = page_num
        super().drawOn(canvas, x, y, _sW)


# ==========================
# TEXT STYLES
# ==========================
styles = getSampleStyleSheet()  # Start from the default stylesheet

# Title page large font
styles.add(ParagraphStyle(
    name="BigTitle",
    fontName="HeiseiMin-W3",
    fontSize=50,
    leading=60,
    alignment=TA_CENTER,
    spaceAfter=20
))

# Author name on title page
styles.add(ParagraphStyle(
    name="AuthorBottom",
    fontName="HeiseiMin-W3",
    fontSize=18,
    leading=24,
    alignment=TA_CENTER,
    spaceBefore=40
))

# Quote styling (for second page)
styles.add(ParagraphStyle(
    name="QuoteStyle",
    fontName="Times-BoldItalic",
    fontSize=20,
    leading=28,
    alignment=TA_CENTER,
    spaceBefore=250,
    spaceAfter=10
))

# Quote attribution (author of the quote)
styles.add(ParagraphStyle(
    name="QuoteAttribution",
    fontName="Times-Italic",
    fontSize=13,
    leading=18,
    alignment=TA_CENTER,
    spaceAfter=40
))

# Table of contents heading
styles.add(ParagraphStyle(
    name="TOCHeading",
    fontName="HeiseiMin-W3",
    fontSize=22,
    leading=30,
    alignment=TA_CENTER,
    spaceAfter=10
))

# Each table of contents entry
styles.add(ParagraphStyle(
    name="TOCEntry",
    fontName="HeiseiMin-W3",
    fontSize=14,
    leading=22,
    alignment=TA_LEFT,
    leftIndent=0.4 * inch,
    spaceAfter=10
))

# Chapter title inside the book
styles.add(ParagraphStyle(
    name="ChapterHeading",
    fontName="Times-BoldItalic",
    fontSize=42,
    leading=50,
    alignment=TA_LEFT,
    spaceAfter=30,
    spaceBefore=100
))

# Regular body text for paragraphs
styles.add(ParagraphStyle(
    name="Body",
    fontName="HeiseiMin-W3",
    fontSize=11,
    leading=17,
    alignment=TA_LEFT,
    spaceAfter=10
))


# ==========================
# UTIL: build the flow (so we can reuse it)
# ==========================
def make_flow():
    flow = []

    # TITLE PAGE
    flow += [
        Spacer(1, 1.2 * inch),
        Paragraph("In the<br/>Street of<br/>Dreams", styles["BigTitle"]),
        Spacer(1, 2 * inch),
        Paragraph("Udhav Saraswat", styles["AuthorBottom"]),
        PageBreak(),
    ]

    # QUOTE PAGE
    flow += [
        Paragraph("“Nothing makes sense — until one day, everything does, for better or worse.”", styles["QuoteStyle"]),
        Paragraph("— Udhav", styles["QuoteAttribution"]),
        PageBreak(),
    ]

    # TABLE OF CONTENTS PAGE
    flow += [
        Spacer(1, 2.5 * inch),
        Paragraph("Contents", styles["TOCHeading"]),
        HRFlowable(width="60%", thickness=2.5, lineCap="round",
                   color=colors.HexColor("#333333"), spaceBefore=8, spaceAfter=25),
    ]

    contents_list = [
        "Chapter 1: The Train",
        "Chapter 2: The City of Mist",
        "Chapter 3: The Clockmaker’s Dream",
    ]
    for c in contents_list:
        flow.append(Paragraph(c, styles["TOCEntry"]))
    flow.append(PageBreak())

    # CHAPTERS (static content in this example)
    def add_chapter_to_flow(title, body):
        flow.append(ChapterHeading(title, styles["ChapterHeading"]))
        flow.append(Spacer(1, 0.3 * inch))
        for para in body.strip().split("\n\n"):
            flow.append(Paragraph(para.strip(), styles["Body"]))
        flow.append(PageBreak())

    add_chapter_to_flow(
        "Chapter 1: The Train",
        "The train hummed like a tired lullaby against the rails, each metallic rattle cutting through the silence of the afternoon. "
        "Outside the window, fields blurred into one another — pale yellow merging with silver-gray. " * 20
    )
    add_chapter_to_flow(
        "Chapter 2: The City of Mist",
        "They say the mornings here are made of smoke and secrets. Every street seems to whisper stories of people who never found their way home. " * 15
    )
    add_chapter_to_flow(
        "Chapter 3: The Clockmaker’s Dream",
        "The city slept, but the clocks didn’t. Somewhere between the hours, time itself seemed to hesitate — as if waiting for permission to move again. " * 15
    )

    return flow


# ==========================
# PASS 1: Render in-memory to populate chapter_starts
# ==========================
# Use a BytesIO buffer so no temporary file is created on disk.
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

# Build the temporary document with NO header function (so header won't rely on chapter_starts yet).
# This pass ensures ChapterHeading.drawOn registers correct start pages in chapter_starts.
temp_doc.build(flow, onFirstPage=lambda c, d: None, onLaterPages=lambda c, d: None)
temp_buffer.close()

# At this point `chapter_starts` should be populated with accurate start pages for each chapter.


# ==========================
# PASS 2: Final PDF build using recorded chapter_starts
# ==========================
final_doc = SimpleDocTemplate(
    "In_the_Street_of_Dreams.pdf",
    pagesize=(PAGE_WIDTH, PAGE_HEIGHT),
    rightMargin=0.75 * inch,
    leftMargin=0.65 * inch,
    topMargin=0.75 * inch,
    bottomMargin=0.75 * inch,
)

# Recreate the flow again (ReportLab flowables are stateful after drawing;
# build a fresh flow so final render is clean)
flow = make_flow()

# Now build the real PDF with header/footer that uses chapter_starts
final_doc.build(flow, onFirstPage=draw_background_and_header, onLaterPages=draw_background_and_header)

print("✅ PDF generated successfully — headers now reliably skipped on every chapter's first page.")
