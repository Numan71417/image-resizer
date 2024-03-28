function resizeImage() {
    var input = document.getElementById("imageInput");
    var scale = document.getElementById("scaleInput").value;
    var output = document.getElementById("output");
    var downloadButton = document.getElementById("downloadButton");

    // Check if an image is selected
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                // Calculate new dimensions
                var newWidth = img.width * scale / 100;
                var newHeight = img.height * scale / 100;

                // Resize image
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Display resized image
                output.innerHTML = "";
                var resizedImg = document.createElement("img");
                resizedImg.src = canvas.toDataURL();
                output.appendChild(resizedImg);

                // Enable download button
                downloadButton.disabled = false;
                downloadButton.setAttribute("download", "resized_image.png");
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        output.innerHTML = "Please select an image.";
        downloadButton.disabled = true;
    }
}

function downloadImage() {
    var resizedImg = document.querySelector("#output img");
    var downloadLink = document.createElement("a");
    downloadLink.href = resizedImg.src;
    downloadLink.download = "resized_image.png";
    downloadLink.click();
}
