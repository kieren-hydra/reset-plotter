
export const createDynamicIcon = (index : number) => {
    const size = 50; // Diameter of the circle
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (ctx) {
        // Draw the circle
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw the number
        ctx.fillStyle = 'black';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), size / 2, size / 2);
    }

    return {
        url: canvas.toDataURL(), // Convert canvas to a base64 image
        scaledSize: new window.google.maps.Size(size, size), // Adjust size
        anchor: new window.google.maps.Point(size / 2, size / 2), // Center the icon
    };
}