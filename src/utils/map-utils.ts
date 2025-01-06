export const createDynamicIcon = (index: number) => {
    const size = 16; // Diameter of the circle
    const padding = 2; // Extra space around the circle
    const canvasSize = size + padding * 2;

    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext('2d');
    if (ctx) {
        // Draw the circle
        ctx.beginPath();
        ctx.arc(canvasSize / 2, canvasSize / 2, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw the number
        ctx.fillStyle = 'black';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), canvasSize / 2, canvasSize / 2);
    }

    return {
        url: canvas.toDataURL(), // Convert canvas to a base64 image
        scaledSize: new window.google.maps.Size(canvasSize, canvasSize), // Adjust size
        anchor: new window.google.maps.Point(canvasSize / 2, canvasSize / 2), // Center the icon
    };
};
