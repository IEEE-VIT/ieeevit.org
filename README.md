# ieee-website
IEEE-VIT Official Website

## Alumni Board Section - Image Management Guide

### Adding/Updating Board Member Images

#### 1. Image Requirements
- **Location**: `/images/board-images/`
- **Format**: JPG
- **Naming Convention**: `FirstName.jpg` (case-sensitive)
- **Examples**: `Akshaya.jpg`, `Vibhuti.jpg`, `Aneesh.jpg`

#### 2. Update JSON Data
1. Open `/alumni_board/board.json`
2. Locate the relevant academic year section
3. Update the `img` field to match your image filename (without .jpg)

Example JSON structure:
json
{
"2023-24": {
"board": [
{
"name": "John Smith",
"pos": "Technical Head",
"img": "John" // Should match John.jpg in images/board-images/
}
]
}

### Important Notes
- Image filenames are case-sensitive
- Ensure the `img` value in board.json exactly matches the image filename
- The system will automatically use the new images once both:
  1. The image file is added to the correct directory
  2. The JSON file is updated with the correct filename

---
© IEEE-VIT Student Branch