import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Load your image as a base64 string
async function fetchImageBase64(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

export async function createInvoice(bookingInfo) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Page size
    const { width, height } = page.getSize();

    // Load image
    // const logoUrl = "/logo.svg"; // Replace with your logo URL
    // const logoBytes = await fetchImageBase64(logoUrl);
    // const logoImage = await pdfDoc.embedPng(logoBytes);
    // const logoDims = logoImage.scale(0.2);

    // Fonts
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Header Section with Logo
    page.drawRectangle({
        x: 0,
        y: height - 100,
        width: width,
        height: 100,
        color: rgb(0, 0.6, 0.6),
    });

    // page.drawImage(logoImage, {
    //     x: 20,
    //     y: height - 90,
    //     width: logoDims.width,
    //     height: logoDims.height,
    // });

    page.drawText("Hotel Booking", {
        x: 100,
        y: height - 50,
        size: 30,
        font: font,
        color: rgb(1, 1, 1),
    });

    page.drawText("Booking Confirmation", {
        x: 100,
        y: height - 80,
        size: 20,
        font: normalFont,
        color: rgb(1, 1, 1),
    });

    // Booking Details
    page.drawText(`Booking ID: #${bookingInfo?._id}`, {
        x: 20,
        y: height - 120,
        size: 12,
        font: normalFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Date: ${Date.now().toLocaleString}`, {
        x: width - 150,
        y: height - 120,
        size: 12,
        font: normalFont,
        color: rgb(0, 0, 0),
    });

    // Guest Information Section
    page.drawText("Guest Information", {
        x: 20,
        y: height - 160,
        size: 16,
        font: font,
        color: rgb(0, 0.6, 0.6),
    });

    page.drawText(`Name: ${bookingInfo?.user?.name}`, {
        x: 20,
        y: height - 180,
        size: 12,
        font: normalFont,
    });
    page.drawText(`Email: ${bookingInfo?.user?.email}`, {
        x: 20,
        y: height - 200,
        size: 12,
        font: normalFont,
    });

    // Reservation Details Section
    page.drawText("Reservation Details", {
        x: 20,
        y: height - 240,
        size: 16,
        font: font,
        color: rgb(0, 0.6, 0.6),
    });

    page.drawText("Check-in: 04/01/2025", {
        x: 20,
        y: height - 260,
        size: 12,
        font: normalFont,
    });
    page.drawText("Check-out: 05/01/2025", {
        x: 20,
        y: height - 280,
        size: 12,
        font: normalFont,
    });
    page.drawText("Nights: 1", {
        x: width / 2,
        y: height - 260,
        size: 12,
        font: normalFont,
    });
    page.drawText("Guests: 4", {
        x: width / 2,
        y: height - 280,
        size: 12,
        font: normalFont,
    });

    // Billing Address Section
    page.drawText("Billing Address", {
        x: 20,
        y: height - 320,
        size: 16,
        font: font,
        color: rgb(0, 0.6, 0.6),
    });

    page.drawText("Street: Laboriosam tempora", {
        x: 20,
        y: height - 340,
        size: 12,
        font: normalFont,
    });
    page.drawText("City: Commodo aliquid est", {
        x: 20,
        y: height - 360,
        size: 12,
        font: normalFont,
    });
    page.drawText("State: Earum aut commodo do", {
        x: 20,
        y: height - 380,
        size: 12,
        font: normalFont,
    });
    page.drawText("ZIP Code: 68527", {
        x: width / 2,
        y: height - 340,
        size: 12,
        font: normalFont,
    });

    // Payment Summary Section
    page.drawText("Payment Summary", {
        x: 20,
        y: height - 420,
        size: 16,
        font: font,
        color: rgb(0, 0.6, 0.6),
    });

    page.drawText("Room Rate (1 nights * $120):", {
        x: 20,
        y: height - 440,
        size: 12,
        font: normalFont,
    });
    page.drawText("$120", {
        x: width - 80,
        y: height - 440,
        size: 12,
        font: normalFont,
    });

    page.drawText("Cleaning Fee:", {
        x: 20,
        y: height - 460,
        size: 12,
        font: normalFont,
    });
    page.drawText("$17.50", {
        x: width - 80,
        y: height - 460,
        size: 12,
        font: normalFont,
    });

    page.drawText("Service Fee:", {
        x: 20,
        y: height - 480,
        size: 12,
        font: normalFont,
    });
    page.drawText("$51.31", {
        x: width - 80,
        y: height - 480,
        size: 12,
        font: normalFont,
    });

    page.drawText("Total Amount:", {
        x: 20,
        y: height - 500,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
    });
    page.drawText("$188.81", {
        x: width - 80,
        y: height - 500,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    // Download PDF in browser
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "invoice.pdf");
}
