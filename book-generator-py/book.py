# ==========================
# IMPORTS
# ==========================
# ReportLab components for creating styled PDF documents
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
    This function runs on every page.
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
    for title, start_page in sorted(chapter_starts.items(), key=lambda x: x[1]):
        # If the current page number >= a chapter’s start page → that’s the current chapter
        if doc.page >= start_page:
            current_title = title
        else:
            break

    # ---- Skip header if this page is a chapter’s start page ----
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
    This subclass of Paragraph is used to automatically detect
    which page a chapter starts on, as soon as it's drawn to the canvas.

    When ReportLab actually renders this paragraph, we record the
    current page number in the global `chapter_starts` dictionary.
    """

    def drawOn(self, canvas, x, y, _sW=0):
        # Record the page number before the text is drawn
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
# DOCUMENT TEMPLATE
# ==========================
# SimpleDocTemplate is the container that holds everything:
# margins, page size, and the final flow of content.
doc = SimpleDocTemplate(
    "In_the_Street_of_Dreams.pdf",
    pagesize=(PAGE_WIDTH, PAGE_HEIGHT),
    rightMargin=0.75 * inch,
    leftMargin=0.65 * inch,
    topMargin=0.75 * inch,
    bottomMargin=0.75 * inch,
)

# This list will contain every element (Paragraphs, Spacers, PageBreaks, etc.)
flow = []


# ==========================
# TITLE PAGE
# ==========================
flow += [
    Spacer(1, 1.2 * inch),
    Paragraph("In the<br/>Street of<br/>Dreams", styles["BigTitle"]),
    Spacer(1, 2 * inch),
    Paragraph("Udhav Saraswat", styles["AuthorBottom"]),
    PageBreak(),
]


# ==========================
# QUOTE PAGE
# ==========================
flow += [
    Paragraph("“Nothing makes sense — until one day, everything does, for better or worse.”", styles["QuoteStyle"]),
    Paragraph("— Udhav", styles["QuoteAttribution"]),
    PageBreak(),
]


# ==========================
# TABLE OF CONTENTS PAGE
# ==========================
flow += [
    Spacer(1, 2.5 * inch),
    Paragraph("Contents", styles["TOCHeading"]),
    HRFlowable(width="60%", thickness=2.5, lineCap="round",
               color=colors.HexColor("#333333"), spaceBefore=8, spaceAfter=25),
]

# Hardcoded TOC list — in future, can be automated
contents_list = [
    "Chapter 1: The Train",
    "Chapter 2: The City of Mist",
    "Chapter 3: The Clockmaker’s Dream",
]
for c in contents_list:
    flow.append(Paragraph(c, styles["TOCEntry"]))
flow.append(PageBreak())


# ==========================
# CHAPTER ADDING FUNCTION
# ==========================
def add_chapter(title, body):
    """
    Adds a full chapter to the flow:
      1. Records its title via ChapterHeading (which auto-tracks page).
      2. Adds spacing.
      3. Adds each paragraph of text from the body.
      4. Inserts a PageBreak after each chapter.
    """
    flow.append(ChapterHeading(title, styles["ChapterHeading"]))
    flow.append(Spacer(1, 0.3 * inch))
    for para in body.strip().split("\n\n"):
        flow.append(Paragraph(para.strip(), styles["Body"]))
    flow.append(PageBreak())


# ==========================
# ADD CHAPTERS (STATIC CONTENT EXAMPLE)
# ==========================
add_chapter(
    "Chapter 1: The Train",
    "The train hummed like a tired lullaby against the rails, each metallic rattle cutting through the silence of the afternoon. "
    "Outside the window, fields blurred into one another — pale yellow merging with silver-gray. " * 20
)
add_chapter(
    "Chapter 2: The City of Mist",
    "They say the mornings here are made of smoke and secrets. Every street seems to whisper stories of people who never found their way home. " * 15
)
add_chapter(
    "Chapter 3: The Clockmaker’s Dream",
    "The city slept, but the clocks didn’t. Somewhere between the hours, time itself seemed to hesitate — as if waiting for permission to move again. " * 15
)


# ==========================
# BUILD FINAL PDF
# ==========================
# This line tells ReportLab to actually generate the PDF.
# The two callback functions handle drawing the background,
# headers, and footers on every page dynamically.
doc.build(
    flow,
    onFirstPage=draw_background_and_header,
    onLaterPages=draw_background_and_header
)

print("✅ PDF generated successfully — chapter headers now correctly hidden on *every* chapter’s first page.")
